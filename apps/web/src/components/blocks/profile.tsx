import { useModal, Avatar } from "connectkit";
import { useAccount } from "wagmi";

import { shortenWalletAddress } from "utils/text";
import { styles as ButtonStyles } from "components/button";
import type { BlockData } from "models/BlockData";
import { cn } from "utils/tailwind";

interface ProfileProps {
  blockData: BlockData;
}

function Profile({}: ProfileProps) {
  const { isConnected, address } = useAccount();
  const { setOpen } = useModal();

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
        </div>
      ) : (
        <div className={cn(ButtonStyles.base, ButtonStyles.fancy)}>
          Connect Wallet
        </div>
      )}
    </button>
  );
}

export default Profile;
