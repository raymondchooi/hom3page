"use client";

import { useState } from "react";
import { writeContract, readContract, waitForTransaction } from "@wagmi/core";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { sepolia, optimismGoerli, polygonMumbai } from "wagmi/chains";
import { useModal } from "connectkit";

import { Button, Loader } from "components";
import { ErrorMessage } from "components/fieldset";
import {
  AddressAndAbi,
  CONTRACTS,
  COST_PER_BLOCK,
  ChainName,
  ContractStore,
  DEFAULT_PAYMENT_TOKEN,
  GENERIC_ABI,
} from "constants/ABIs/contracts";
import { updateBlock } from "api/editBlock";

const BLOCK_COST_USDC = 100;

interface BuyButtonProps {
  purchasableBlocks: Map<string, object>;
  optimisedBlockIds?: string[][];
  setBought: (bought: boolean) => void;
  bought: boolean;
  callback: (state: number, data?: string, error?: boolean) => void;
}

function BuyButton({
  purchasableBlocks,
  optimisedBlockIds,
  setBought,
  bought,
  callback,
}: BuyButtonProps) {
  const { address } = useAccount();
  const balance = useBalance({ address, chainId: sepolia.id });
  const { chain, chains } = useNetwork();
  const { openSwitchNetworks, setOpen } = useModal();

  const [loading, setLoading] = useState(false);

  const [network, setNetwork] = useState<ChainName>("maticMumbai");

  const blocksCost =
    COST_PER_BLOCK?.[network as ChainName] || 0 * purchasableBlocks.size;
  const isBalanceSufficient = balance?.data?.formatted || 0 >= blocksCost;

  const getNetwork = () => {
    const net: ChainName =
      chain?.id === sepolia.id
        ? "ethSepolia"
        : chain?.id === polygonMumbai.id
          ? "maticMumbai"
          : "eth";

    setNetwork(net);
    return net;
  };

  async function handleBuyButtonClick() {
    setLoading(true);
    setBought(true);
    console.log("blocks", optimisedBlockIds);

    // get network
    let net = getNetwork();
    if (net !== "maticMumbai" && net !== "ethSepolia") {
      openSwitchNetworks();
    }

    if (!address) {
      setOpen(true);
    }

    const cost = purchasableBlocks.size * COST_PER_BLOCK[net]!;
    const saleContract: AddressAndAbi = CONTRACTS?.[net]?.[
      net === "maticMumbai" ? "BlockSales" : "BlockStore"
    ] as AddressAndAbi;

    console.log("network ", net);

    if (
      CONTRACTS?.maticMumbai?.BlockSales &&
      CONTRACTS?.ethSepolia?.BlockStore
    ) {
      // get the allowance of teh contract of the payment token
      let allowance;
      try {
        allowance = await readContract({
          address: DEFAULT_PAYMENT_TOKEN[net] as `0x${string}`,
          abi: GENERIC_ABI.ERC20,
          functionName: "allowance",
          args: [address, saleContract?.address],
        });
      } catch (error) {
        console.log("allowance", error);
      }
      if (optimisedBlockIds?.[0]?.[0]) {
        // Check allowance covers payment
        let addAllowance;
        if (cost > (allowance as number)) {
          callback(1);

          try {
            // They need to add allowanceaaaaaa
            // Approve the send to the sales contracts
            const { hash } = (addAllowance = await writeContract({
              address: DEFAULT_PAYMENT_TOKEN[net] as `0x${string}`,
              abi: GENERIC_ABI.ERC20,
              functionName: "approve",
              args: [saleContract.address, cost],
            }));
            await waitForTransaction({ hash, chainId: chain?.id });
          } catch (error) {
            console.log("approve", error);
            return callback(10, "error", true);
          }
        }
        callback(2, addAllowance?.hash);
        console.log(
          "tokens to buy",
          optimisedBlockIds.length === 1
            ? [optimisedBlockIds]
            : optimisedBlockIds,
        );
        //  Send the purchase
        try {
          const { hash } = await writeContract({
            address: saleContract.address as `0x${string}`,
            abi: saleContract.abi,
            functionName: "buyBlock",
            args: [
              purchasableBlocks.size === 1
                ? [optimisedBlockIds]
                : optimisedBlockIds,
              purchasableBlocks.size === 1 ? false : true,
            ],
          });
          callback(3, hash);

          await waitForTransaction({ hash, chainId: chain?.id });
        } catch (error) {
          console.log("buyBlock", error);
          return callback(10, "error", true);
        }

        // Verify transactions
        // if connected to mumbai - display minted block tx
        if (network === "maticMumbai") {
          callback(5);
          if (optimisedBlockIds) {
            //@ts-ignore
            const blockUpdate = optimisedBlockIds
              .flat()
              .flat()
              .filter((id) => id !== undefined)
              .map((id: string) => ({ id, owner: address }));
            await updateBlock(blockUpdate);
          }
        } else {
          callback(4);
          // 20---minutes---laterrrr

          callback(5);
          if (optimisedBlockIds) {
            //@ts-ignore
            const blockUpdate = optimisedBlockIds
              .flat()
              .flat()
              .filter((id) => id !== undefined)
              .map((id: string) => ({ id, owner: address }));
            await updateBlock(blockUpdate);
          }
        }

        // if on Sepplia wait for message sent,
        //  get messageId and wait listen to Mumbai Sales contract for compleaion event
      }
    }
  }

  function renderButtonContent() {
    if (loading) {
      return (
        <div className="mx-3 my-1">
          <Loader size="small" />
        </div>
      );
    }

    return (
      <>
        {`Buy ${purchasableBlocks.size} Block${purchasableBlocks.size > 1 ? "s" : ""}`}
      </>
    );
  }

  //TODO remove bought placeholder
  if (purchasableBlocks.size > 0) {
    return (
      <div className="z-[10] flex items-center">
        <Button
          fancy
          disabled={!isBalanceSufficient || loading}
          onClick={handleBuyButtonClick}
        >
          {renderButtonContent()}
        </Button>
        {!!balance?.data?.symbol && !!balance?.data?.formatted && (
          <div className="ml-4 flex flex-col text-sm text-gray-400">
          <div>{`Cost: ${BLOCK_COST_USDC * purchasableBlocks.size} USDC `}</div>
          <div>{`Balance: ${parseFloat(balance?.data?.formatted || "-").toFixed(3)} ${balance.data.symbol}`}</div>
        </div>
        )}
        {!isBalanceSufficient && (
          <ErrorMessage className="ml-4">Insufficient balance</ErrorMessage>
        )}
      </div>
    );
  }

  return (
    <div className="text-base text-gray-400">All selected blocks owned.</div>
  );
}

export default BuyButton;
