"use client";

import { Button } from "components";

interface BuyButtonProps {
  purchasableBlocks: Map<string, object>;
  balance: any;
  optimisedBlockIds?: (string | (string | undefined)[] | undefined)[];
  setBought: (bought: boolean) => void;
  bought: boolean;
}

function BuyButton({
  purchasableBlocks,
  balance,
  optimisedBlockIds,
  setBought,
  bought,
}: BuyButtonProps) {
  function handleBuyButtonClick() {
    setBought(true);
    console.log("blocks", optimisedBlockIds);
  }

  //TODO remove bought placeholder
  if (purchasableBlocks.size > 0 && !bought) {
    return (
      <div className="flex items-center">
        <Button
          onClick={handleBuyButtonClick}
        >{`Buy ${purchasableBlocks.size} Block${purchasableBlocks.size > 1 ? "s" : ""}`}</Button>
        <div className="ml-4 text-sm text-gray-500">
          {`Balance: ${parseFloat(balance?.data?.formatted ?? "0").toFixed(3)} ${balance?.data?.symbol}`}
        </div>
      </div>
    );
  }

  return (
    <div className="text-base text-gray-500">All selected blocks owned.</div>
  );
}

export default BuyButton;
