"use client";

import { useState } from "react";
import { writeContract, readContract } from "@wagmi/core";
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

interface BuyButtonProps {
  purchasableBlocks: Map<string, object>;
  optimisedBlockIds?: ((string | undefined)[][] | undefined)[];
  setBought: (bought: boolean) => void;
  bought: boolean;
  callback: (state: number) => void;
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
  const { openSwitchNetworks } = useModal();

  const [loading, setLoading] = useState(false);

  const blocksCost = COST_PER_BLOCK * purchasableBlocks.size;
  const isBalanceSufficient = balance?.data?.formatted || 0 >= blocksCost;

  async function handleBuyButtonClick() {
    setLoading(true);
    setBought(true);
    console.log("blocks", optimisedBlockIds);

    // get network
    const network: ChainName =
      chain?.id === sepolia.id
        ? "ethSepolia"
        : chain?.id === polygonMumbai.id
          ? "maticMumbai"
          : "eth";
    if (network !== "maticMumbai" && network !== "ethSepolia") {
      openSwitchNetworks();
    }
    const cost = purchasableBlocks.size * COST_PER_BLOCK;
    const saleContract: AddressAndAbi = CONTRACTS?.[network]?.[
      network === "maticMumbai" ? "BlockSales" : "BlockStore"
    ] as AddressAndAbi;

    if (
      CONTRACTS?.maticMumbai?.BlockSales &&
      CONTRACTS?.ethSepolia?.BlockStore
    ) {
      // get the allowance of teh contract of the payment token
      const allowance = await readContract(
        {
          address: DEFAULT_PAYMENT_TOKEN[network],
          abi: GENERIC_ABI.ERC20,
          functionName: "allowance",
          args: [address, saleContract?.address],
        },
        null,
      );
      if (optimisedBlockIds?.[0]?.[0]) {
        // Check allowance covers payment
        if (cost > allowance) {
          // They need to add allowanceaaaaaa
          // Approve the send to the sales contracts
          const addAllowance = await writeContract({
            address: DEFAULT_PAYMENT_TOKEN[network],
            abi: GENERIC_ABI.ERC20,
            functionName: "approve",
            args: [saleContract.address, cost],
          });
        }

        //  Send the purchase
        const purchaseReturn = await writeContract(
          {
            address: saleContract.address,
            abi: saleContract.abi,
            functionName: "buyBlock",
            args: [
              optimisedBlockIds[0][0],
              purchasableBlocks.size === 1 ? true : false,
            ],
          },
          null,
        );

        // Verify transactions
        // if connected to mumbai - display minted block tx

        // if on Sepplia wait for message sent,
        //  get messageId and wait listen to Mumbai Sales contract for compleaion event
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
