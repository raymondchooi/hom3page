import { useModal, Avatar } from "connectkit";
import { useAccount } from "wagmi";

import { shortenWalletAddress } from "utils/text";
import { styles as ButtonStyles } from "components/button";
import type { BlockData } from "models/BlockData";
import { cn } from "utils/tailwind";
import { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { CONTRACTS } from "constants/ABIs/contracts";
import { type WalletClient, useWalletClient } from "wagmi";
import { BrowserProvider, JsonRpcSigner, ethers } from "ethers";

interface ProfileProps {
  blockData: BlockData;
}

function Profile({}: ProfileProps) {
  const { isConnected, address } = useAccount();

  const { setOpen } = useModal();
  const [profileId, setProfileId] = useState<number>();
  const [profilesBalance, setProfilesBalance] = useState<number>();
  const [loaded, setloaded] = useState<boolean>();
  const [profileContract, setProfileContract] = useState<Contract>();

  const getProfile = async () => {
    const network = new ethers.Network("mumbai", 80001);
    const provider = new ethers.JsonRpcProvider(
      `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MATICMUMBAI_KEY}`,
    );
    console.log(provider);

    const contract = new ethers.Contract(
      CONTRACTS?.maticMumbai?.Hom3Profile.address,
      CONTRACTS?.maticMumbai?.Hom3Profile.abi,
      provider,
    ).connect(provider);
    console.log("Blcok ", await provider.getBlock());

    const id = await contract?.getProfileOfAddress(address);
    const balance = id ? await contract?.fragment?.getProfilesBalance(id) : 0;

    setProfilesBalance(balance);
    setProfileId(id);
    setProfileContract(contract);
    console.log("Profile Id:", id);
    console.log("balance :", balance);
    setloaded(true);
    return balance;
  };

  useEffect(() => {
    if (!profileContract && !loaded) getProfile();
  });

  return (
    <button
      onClick={() => setOpen(true)}
      className="z-[1] flex h-full w-full cursor-pointer items-center justify-center bg-gray-700 p-1"
    >
      {isConnected ? (
        <div className="flex flex-col items-center justify-center ">
          <Avatar address={address} size={32} radius={16} />
          <div className="mt-2 truncate text-xs font-bold text-gray-400">
            {shortenWalletAddress(address)}
          </div>
          Profile #{profileId}
          <br />
          balance {profilesBalance}
        </div>
      ) : (
        <div className={cn(ButtonStyles.base, ButtonStyles.fancy.more)}>
          Connect Wallet
        </div>
      )}
    </button>
  );
}

export default Profile;
