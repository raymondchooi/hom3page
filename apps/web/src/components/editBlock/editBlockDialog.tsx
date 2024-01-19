"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useAccount, sepolia } from "wagmi";
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

  const [bought, setBought] = useState(false);
  const [selectedBlocksForEditing, setSelectedBlocksForEditing] = useState<
    Map<string, object>
  >(new Map());
  const [editBappId, setEditBappId] = useState<string>("");
  const [editBappValue, setEditBappValue] = useState<string>("");
  //TODO save this somewhere
  const [bAppStoredValues, setBAppStoredValues] =
    useState<Record<string, string>>();

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
      if (!block?.owner && blockIds.includes(block.id)) {
        purchasableBlocks.set(block.id, block);
      }
    }

    return purchasableBlocks;
  }, [blockIds, wallData]);

  const optimisedBlockIds = useMemo(() => {
    const result = [];
    for (let i = 0; i < blockIds.length; i++) {
      const currentBlockId = Number(blockIds[i]);
      if (i === 0 || currentBlockId !== Number(blockIds[i - 1]) + 1) {
        result.push([blockIds[i]]);
      } else {
        result[result.length - 1]!.push(blockIds[i]);
      }
    }
    return result.map((item) => (item.length === 1 ? item[0] : [item]));
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

  function handleBappEditSave() {
    setEditBappId("");

    for (const blockId of selectedBlocksForEditing!.keys()) {
      setBAppStoredValues((prev) => ({
        ...prev,
        [blockId]: editBappValue,
      }));
    }
  }

  function handleBappEditBackClick() {
    setEditBappId("");
    setEditBappValue("");
  }

  function handleBappEditValueChange(value: string) {
    setEditBappValue(value);
  }

  function handleBappSummaryClick(bappId: string) {
    if (ownedBlocks.size > 0 || bought) setEditBappId(bappId);
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
                />

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
