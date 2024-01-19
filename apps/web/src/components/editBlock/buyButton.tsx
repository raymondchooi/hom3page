"use client";

import { useState } from "react";
import { writeContract } from "@wagmi/core";
import { useAccount, useBalance, sepolia } from "wagmi";

import { Button, Loader } from "components";
import { ErrorMessage } from "components/fieldset";
import { CONTRACTS, COST_PER_BLOCK } from "constants/ABIs/contracts";

interface BuyButtonProps {
  purchasableBlocks: Map<string, object>;
  optimisedBlockIds?: ((string | undefined)[][] | undefined)[];
  setBought: (bought: boolean) => void;
  bought: boolean;
}

function BuyButton({
  purchasableBlocks,
  optimisedBlockIds,
  setBought,
  bought,
}: BuyButtonProps) {
  const { address } = useAccount();
  const balance = useBalance({ address, chainId: sepolia.id });

  const [loading, setLoading] = useState(false);

  const isBalanceSufficient =
    balance?.data?.formatted || 0 >= COST_PER_BLOCK * purchasableBlocks.size;

  async function handleBuyButtonClick() {
    setLoading(true);
    setBought(true);
    console.log("blocks", optimisedBlockIds);

    if (CONTRACTS?.maticMumbai?.BlockSales) {
      if (purchasableBlocks.size === 1) {
        const { hash } = await writeContract({
          address: CONTRACTS.maticMumbai.BlockSales.address,
          abi: CONTRACTS.maticMumbai.BlockSales.abi,
          functionName: "buyBlock",
          args: [optimisedBlockIds[0][0]],
        })
      } else {
        const { hash } = await writeContract({
          address: CONTRACTS.maticMumbai.BlockSales.address,
          abi: CONTRACTS.maticMumbai.BlockSales.abi,
          functionName: "buyBatchBlocks",
          args: [optimisedBlockIds],
        });
      }
    }
  }

  function renderButtonContent() {
    if (loading) {
      return <Loader size="small" />;
    }

    return (
      <>
        {`Buy ${purchasableBlocks.size} Block${purchasableBlocks.size > 1 ? "s" : ""}`}
      </>
    );
  }

  //TODO remove bought placeholder
  if (purchasableBlocks.size > 0 && !bought) {
    return (
      <div className="z-[10] flex items-center">
        <Button
          fancy
          disabled={!isBalanceSufficient || loading}
          onClick={handleBuyButtonClick}
        >{`Buy ${purchasableBlocks.size} Block${purchasableBlocks.size > 1 ? "s" : ""}`}</Button>
        {!!balance?.data?.symbol && !!balance?.data?.formatted && (
          <div className="ml-4 text-sm text-gray-400">
            {renderButtonContent()}
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
