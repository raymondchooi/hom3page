"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useAccount, sepolia, useNetwork } from "wagmi";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import { Button, BappEdit, BappCarousel } from "components";
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "components/dialog";
import { BAPPS_BASE_URL } from "constants/urls";
import { type BlockData } from "models/BlockData";
import BuyButton from "./buyButton";
import SelectBlocks from "./selectBlocks";
import { buildNetworkScanLink } from "utils/text";
import { ChainName } from "constants/ABIs/contracts";
import { polygonMumbai } from "wagmi/chains";
import { updateBlock } from "api/editBlock";

interface EditBlockDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  wallData: BlockData[];
}

function EditBlockDialog({ open, setOpen, wallData }: EditBlockDialogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const editBlockParam = searchParams.get("editBlock");

  const { address } = useAccount();
  const { chain } = useNetwork();

  const [bought, setBought] = useState(false);
  const [selectedBlocksForEditing, setSelectedBlocksForEditing] = useState<
    Map<string, Partial<BlockData>>
  >(new Map());
  const [editBappId, setEditBappId] = useState<string>("");
  const [editBappValue, setEditBappValue] = useState<string>("");
  //TODO save this somewhere
  const [bAppStoredValues, setBAppStoredValues] =
    useState<Record<string, string>>();

  const [buyState, setBuyState] = useState<number>(0);
  const [hash, setHash] = useState<string>();
  const [hasError, setError] = useState<string | undefined>("");
  const handleBuyStateChange = (
    state: number,
    data?: string,
    error?: boolean,
  ) => {
    setBuyState(state);
    if (data) setHash(data);
    if (error) setError(data);
  };

  const [network, setNetwork] = useState<ChainName>(
    chain?.id === sepolia.id
      ? "ethSepolia"
      : chain?.id === polygonMumbai.id
        ? "maticMumbai"
        : "eth",
  );

  useEffect(() => {
    const current =
      chain?.id === sepolia.id
        ? "ethSepolia"
        : chain?.id === polygonMumbai.id
          ? "maticMumbai"
          : "eth";

    if (current !== network) setNetwork(current);
  }, [network, chain]);

  const blockIds = useMemo(() => {
    return editBlockParam
      ? editBlockParam.split(",").sort((a, b) => parseInt(a) - parseInt(b))
      : [];
  }, [editBlockParam]);

  const blockIdsText = `#${blockIds.join(", #")}`;

  // TODO optimise this late night code, this is to double check on frontend that blocks are editable
  const ownedBlocks = useMemo(() => {
    const ownedBlocks = new Map();

    for (const block of wallData) {
      if (block?.owner === address && blockIds.includes(block.id)) {
        ownedBlocks.set(block.id, block);
      }
    }

    return ownedBlocks;
  }, [wallData, address, blockIds]);

  const purchasableBlocks = useMemo(() => {
    const purchasableBlocks = new Map();

    for (const block of wallData) {
      // TODO change to check if purchasable
      block.id;
      if (!block?.owner && blockIds.includes(block.id)) {
        purchasableBlocks.set(block.id, block);
      }
    }

    return purchasableBlocks;
  }, [blockIds, wallData]);

  const optimisedBlockIds = useMemo(() => {
    const result: number[][] = [];
    let previousBlockId: number | null = null;

    for (const blockId of blockIds) {
      const currentBlockId = Number(blockId);
      if (previousBlockId === null || currentBlockId !== previousBlockId + 1) {
        result.push([currentBlockId]);
      } else {
        const lastSubArray = result[result.length - 1];
        if (lastSubArray) {
          lastSubArray.push(currentBlockId);
        }
      }
      previousBlockId = currentBlockId;
    }

    console.log("optimisedBlocks", result);

    return result;
  }, [blockIds]);

  function handleSelectMultipleClick() {
    setOpen(false);

    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );

    currentParams.set("selectMultipleBlocks", "true");
    currentParams.delete("editBlock");

    router.push(`${pathname}?${currentParams.toString()}`);
  }

  async function handleBappEditSave() {
    setEditBappId("");
    let newBlocks = [];

    for (const blockId of selectedBlocksForEditing!.keys()) {
      newBlocks.push({
        id: blockId,
        type: editBappId,
        content: editBappValue,
        ...(selectedBlocksForEditing!.get(blockId)!.width
          ? { width: selectedBlocksForEditing!.get(blockId)!.width }
          : {}),
        ...(selectedBlocksForEditing!.get(blockId)!.height
          ? { height: selectedBlocksForEditing!.get(blockId)!.height }
          : {}),
        isFirstBlock:
          selectedBlocksForEditing!.get(blockId)!.isFirstBlock || false,
        owner: address,
      });

      setBAppStoredValues((prev) => ({
        ...prev,
        [blockId]: editBappValue,
      }));
    }

    await updateBlock(newBlocks);
  }

  function handleBappEditBackClick() {
    setEditBappId("");
    setEditBappValue("");
  }

  function handleBappEditValueChange(value: string) {
    setEditBappValue(value);
  }

  function handleBappSummaryClick(bappId: string) {
    //  if (selectedBlocksForEditing.size > 0 && (ownedBlocks.size > 0))
    setEditBappId(bappId);
  }

  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="border border-zinc-800 bg-zinc-900"
    >
      <DialogTitle className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <div className="mr-4 overflow-auto text-xl font-semibold text-gray-200">
            {blockIdsText}
          </div>
        </div>
        <Button plain onClick={() => setOpen(false)}>
          <svg
            className="h-6 w-6 text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <title>Close</title>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </DialogTitle>
      <DialogBody>
        <DialogDescription>
          <ol className="list-decimal space-y-6 pl-4 text-lg text-gray-200">
            <li className="pl-4">
              <div className="flex flex-col items-start">
                <BuyButton
                  purchasableBlocks={purchasableBlocks}
                  optimisedBlockIds={optimisedBlockIds}
                  setBought={setBought}
                  bought={bought}
                  callback={handleBuyStateChange}
                />
                <div className="mt-2 text-xs">
                  {buyState === 1 &&
                    "Please approve the sales contract to spend your USDC"}
                  {buyState === 2 && "Please approve the purchase transaction"}
                  {buyState === 3 && "Waiting for transaction to confirm"}
                  {buyState === 4 &&
                    "Sent transaction to Hom3, this might take 20 mins"}
                  {buyState === 5 && "Thank you for buying a part of Hom3"}
                  {buyState === 10 && `There was an error with the transaction`}

                  <br />
                  {hash && !hasError && (
                    <a
                      href={buildNetworkScanLink({
                        network: network,
                        txHash: hash,
                      })}
                      target={"_blank"}
                    >
                      See transaction
                    </a>
                  )}
                </div>

                <button
                  onClick={handleSelectMultipleClick}
                  className="mt-2 cursor-pointer text-sm text-gray-400 underline"
                >
                  Select more blocks
                </button>
              </div>
            </li>
            <li className="pl-4">
              {`Edit block${ownedBlocks.size > 1 ? "s" : ""}`}
              {/** TODO change bought to ownedBlocks.size */}
              <span className="ml-2 text-xs">{`(${selectedBlocksForEditing?.size ?? 0} selected)`}</span>
            </li>
          </ol>

          <SelectBlocks
            purchasableBlocks={purchasableBlocks}
            bought={bought}
            blockIds={blockIds}
            editBappId={editBappId}
            editBappValue={editBappValue}
            bAppStoredValues={bAppStoredValues}
            selectedBlocksForEditing={selectedBlocksForEditing}
            setSelectedBlocksForEditing={setSelectedBlocksForEditing}
          />

          <div className="mt-6 flex justify-between border-t border-gray-600 pt-4 text-gray-400">
            {!!editBappId ? (
              <button
                className="flex cursor-pointer items-center text-left hover:scale-105"
                onClick={handleBappEditBackClick}
              >
                <ArrowLeftIcon className="mr-2 inline-block h-4 w-4" />
                Back
              </button>
            ) : (
              <div></div>
            )}
            <Link
              className="cursor-pointer text-right underline"
              href={BAPPS_BASE_URL}
            >
              Explore more
            </Link>
          </div>

          {editBappId ? (
            <BappEdit
              bAppId={editBappId}
              onSave={handleBappEditSave}
              onChange={handleBappEditValueChange}
            />
          ) : (
            <BappCarousel onBappClick={handleBappSummaryClick} />
          )}
        </DialogDescription>
      </DialogBody>
    </Dialog>
  );
}

export default EditBlockDialog;
