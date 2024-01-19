"use client";

import { Button } from "components";

interface BuyButtonProps {
  purchasableBlocks: Map<string, object>;
  balance: any;
  optimisedBlockIds?: ((string | undefined)[] | undefined)[];
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
      <div className="z-[10] flex items-center">
        <Button
          fancy
          onClick={handleBuyButtonClick}
        >{`Buy ${purchasableBlocks.size} Block${purchasableBlocks.size > 1 ? "s" : ""}`}</Button>
        {!!balance?.data?.symbol && !!balance?.data?.formatted && (
          <div className="ml-4 text-sm text-gray-400">
            {`Balance: ${parseFloat(balance?.data?.formatted ?? "0").toFixed(3)} ${balance?.data?.symbol}`}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="text-base text-gray-400">All selected blocks owned.</div>
  );
}

export default BuyButton;
