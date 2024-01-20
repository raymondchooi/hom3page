import { useModal, Avatar } from "connectkit";
import { useAccount } from "wagmi";

import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "components/dialog";
import { shortenWalletAddress } from "utils/text";
import { Button } from "components";
import { styles as ButtonStyles } from "components/button";
import type { BlockData } from "models/BlockData";
import { cn } from "utils/tailwind";
import { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { CONTRACTS } from "constants/ABIs/contracts";
import { type WalletClient, useWalletClient } from "wagmi";
import { BrowserProvider, JsonRpcSigner, ethers } from "ethers";
import { LensClient } from "@lens-protocol/client";
import getLensClient from "utils/lens";
import {
  floatToHex,
  floatToHexBigInt,
  bigIntToHex,
  floatToHexFloat,
} from "utils/number";

interface ProfileProps {
  blockData: BlockData;
}

function Profile({}: ProfileProps) {
  const { isConnected, address } = useAccount();
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const { setOpen } = useModal();

  const [profileId, setProfileId] = useState<{
    home?: number;
    lens?: number;
  }>();
  const [profilesBalance, setProfilesBalance] = useState<number>(0);
  const [lensProfile, setLensProfile] = useState();
  const [loaded, setloaded] = useState<boolean>();
  const [profileContract, setProfileContract] = useState<ethers.Contract>();
  const [lensClient, setLensClient] = useState<LensClient>();

  useEffect(() => {
    const getProfile = async () => {
      const provider = new ethers.JsonRpcProvider(
        `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MATICMUMBAI_KEY}`,
      );

      const contract = new ethers.Contract(
        CONTRACTS?.maticMumbai?.Hom3Profile.address,
        CONTRACTS?.maticMumbai?.Hom3Profile.abi,
        provider,
      );

      const id = parseFloat(await contract?.getProfileOfAddress(address));
      const balance = id
        ? parseFloat(await contract?.getProfilesBalance(id))
        : 0;

      setProfilesBalance(balance);
      setProfileId((prv) => ({ ...prv, home: id }));
      setProfileContract(contract);

      setloaded(true);
    };
    if (!profileContract && !loaded) getProfile();
  }, [profileContract, loaded]);

  useEffect(() => {
    if (!lensClient) {
      setLensClient(getLensClient());
      console.log("got lens client");
    } else if (profileContract && !profileId?.lens && profileId?.home) {
      console.log("getting lens profile: ", profileId);
      getLensProfile();
    }

    async function getLensProfile() {
      const lensId = await profileContract?.getProfileLensId(profileId?.home);
      console.log("got lens profile id", bigIntToHex(lensId));

      const profile = await lensClient?.profile.fetch({
        forProfileId: bigIntToHex(lensId),
      });

      /*      .fetchAll({
        where: {
          ownedBy: [address as string],
        },
      }); */
      /*  .fetch({
          forProfileId: `0x${parseFloat(lensId)}`,
        }); */
      console.log("got lens profile", profile);
      setProfileId((prv) => ({ ...prv, lens: lensId }));
      setLensProfile(profile);
    }
  }, [lensClient, profileId, profileContract]);

  function handleProfileClick() {
    if (isConnected) setOpen(true);
    else setOpenProfileDialog(true);
  }

  return (
    <>
      <button
        onClick={handleProfileClick}
        className="z-[1] flex h-full w-full cursor-pointer items-center justify-center bg-gray-700 p-1"
      >
        {isConnected ? (
          <div className="flex flex-col items-center justify-center ">
            <Avatar address={address} size={32} radius={16} />
            <div className="mt-2 truncate text-xs font-bold text-gray-400">
              {shortenWalletAddress(address)}
            </div>
            <div className="text=l">
              <div>
                {lensProfile ? (
                  <div>
                    <div className="text-xs">Hey,,,</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-xs">profile</div>#{profileId?.lens}{" "}
                  </div>
                )}
              </div>
              <div className="text-xs">profile</div>#{profileId?.lens}
              <br />
              <div className="text-xs">{profilesBalance.toFixed(3)}</div>
            </div>
          </div>
        ) : (
          <div className={cn(ButtonStyles.base, ButtonStyles.fancy.more)}>
            Connect Wallet
          </div>
        )}
      </button>
      {openProfileDialog && (
        <Dialog
          open={openProfileDialog}
          onClose={setOpenProfileDialog}
          className="border border-zinc-800 bg-zinc-900"
        >
          <DialogTitle className="flex items-center justify-between text-gray-200">
            <div className="text-gray-200">Welcome to Hom3page!</div>
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
            <DialogDescription className="text-gray-300">
              <p>
                Home3page, the home of web3. A decentralised wall of interactive
                web3 blocks that connect the web3 ecosystem and community. The
                wall features programmable blocks built, owned, and governed by
                the community.
              </p>
              <p className="mt-3">
                Each ERC-721 block can be edited to become an abstract, launch
                pad, or entire sector of web3. Each block can be filled with
                prebuilt or community-based apps including static text, images,
                or custom interactive apps with different hosting and connection
                abilities.
              </p>
              <p className="mt-3">
                The unique combination of blocks is an ever-evolving display of
                web3 with its own underlying economy. Hom3page features a block
                app marketplace, decentralised advertising network and the
                forefront of web3 technology.
              </p>
            </DialogDescription>
            <div className="flex">
              <div className="z-[10] mt-8 flex w-full justify-center">
                <Button fancy onClick={() => setOpen(false)} className="w-full">
                  Start exploring
                </Button>
              </div>
            </div>
          </DialogBody>
        </Dialog>
      )}
    </>
  );
}

export default Profile;
