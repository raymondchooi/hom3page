import { useModal, Avatar } from "connectkit";
import { useAccount } from "wagmi";

import { shortenWalletAddress } from "utils/text";
import type { BlockData } from "models/BlockData";

interface ProfileProps {
  blockData: BlockData;
}

function Profile({}: ProfileProps) {
  const { isConnected, address } = useAccount();
  const { setOpen } = useModal();

  return (
    <button onClick={() => setOpen(true)} className="flex cursor-pointer h-full w-full items-center justify-center p-1">
      {isConnected ? (
        <div  className="flex justify-center items-center flex-col ">
          <Avatar address={address} size={32} radius={16} />
          <div className="truncate text-xs font-bold text-gray-500 mt-2">
            {shortenWalletAddress(address)}
          </div>
        </div>
      ) : (
        <div
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Connect Wallet
        </div>
      )}
    </button>
  );
}

export default Profile;
