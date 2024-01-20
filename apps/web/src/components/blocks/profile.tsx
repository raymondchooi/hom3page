import { type ChangeEvent } from "react";
import Image from "next/image";
import { useModal, Avatar } from "connectkit";
import { useAccount } from "wagmi";

import { Field, Label } from "components/fieldset";
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "components/dialog";
import { shortenWalletAddress } from "utils/text";
import { Button, Input } from "components";
import { styles as ButtonStyles } from "components/button";
import type { BlockData } from "models/BlockData";
import { cn } from "utils/tailwind";
import { useEffect, useState } from "react";
import { CONTRACTS } from "constants/ABIs/contracts";
import { type WalletClient, useWalletClient } from "wagmi";
import { BrowserProvider, JsonRpcSigner, ethers } from "ethers";
import { LensClient } from "@lens-protocol/client";
import getLensClient from "utils/lens";
import { floatToHex, floatToHexBigInt, bigIntToHex } from "utils/number";
import { getLensProfile } from "utils/lens/getLensProfiles";
import parseLensProfile from "utils/lens/parseLensProfile";

interface LensProfile {
  metadata: {
    picture: {
      optimized: {
        uri: string;
      };
    };
  };
  handle: {
    localName: string;
  };
}

interface ProfileFragment {
  id: string;
  metadata: {
    picture: {
      optimized: {
        uri: string;
      };
    };
  };
  handle: {
    localName: string;
  };
}
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
  const [lensProfile, setLensProfile] = useState<any>(null);
  const [loaded, setloaded] = useState<boolean>();
  const [profileContract, setProfileContract] = useState<ethers.Contract>();
  const [lensClient, setLensClient] = useState<LensClient>();

  useEffect(() => {
    const getProfile = async () => {
      const provider = new ethers.JsonRpcProvider(
        `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MATICMUMBAI_KEY}`,
      );

      const contract = new ethers.Contract(
        CONTRACTS?.maticMumbai?.Hom3Profile?.address || "",
        CONTRACTS?.maticMumbai?.Hom3Profile?.abi || "",
        provider,
      );

      if (contract?.getProfileOfAddress && contract?.getProfilesBalance) {
        const id = parseFloat(await contract?.getProfileOfAddress(address));
        const balance = id
          ? parseFloat(await contract?.getProfilesBalance(id))
          : 0;

        setProfilesBalance(balance);
        setProfileId((prv) => ({ ...prv, home: id }));
        setProfileContract(contract);
      }

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
      getLensPro();
    }

    async function getLensPro() {
      if (!profileContract?.getProfileLensId) return;

      const lensId = await profileContract?.getProfileLensId(profileId?.home);
      console.log("got lens profile id", bigIntToHex(lensId));
      setProfileId((prv) => ({ ...prv, lens: parseInt(lensId) }));

      const profile = await getLensProfile(
        lensClient!,
        bigIntToHex(lensId),
        "id",
      );

      setProfileId((prv) => ({ ...prv, lens: lensId }));
      if (profile) setLensProfile(profile);
    }
  }, [lensClient, profileId, profileContract]);

  function handleProfileClick() {
    if (isConnected) setOpenProfileDialog(true);
    else setOpen(true);
  }

  async function linkLensProfileToHom3Profile() {
    if (lensInput > 0) {
      const prof = await getLensProfile(
        lensClient!,
        lensInput.toString(),
        "id",
      );
      if (prof?.handle?.ownedBy === address) {
        // makesure on mumbai
        // call contract function
      }
    }
  }
  const [lensInput, setLensInput] = useState<number>(0);
  function handleLensLinkInputChange(e: ChangeEvent<HTMLInputElement>) {
    setLensInput(parseInt(e.target.value));
  }

  return (
    <>
      <button
        onClick={handleProfileClick}
        className="z-[1] flex h-full w-full cursor-pointer items-center justify-center bg-gray-700 p-1"
      >
        {isConnected ? (
          <div className="flex flex-col items-center justify-center ">
            {lensProfile?.metadata?.picture?.optimized?.uri ? (
              <Image
                src={parseLensProfile(lensProfile, "image")}
                className="rounded-full "
                width={32}
                height={32}
                alt="Lens profile image"
              />
            ) : (
              <Avatar address={address} size={32} radius={16} />
            )}
            <div className="mt-2 truncate text-xs font-bold text-gray-400">
              {shortenWalletAddress(address)}
            </div>
            <div className="text=l">
              <div>
                {lensProfile ? (
                  <div>
                    <div className="mt-1 text-xs text-gray-400">Hey </div>
                    {parseLensProfile(lensProfile, "handle")}
                  </div>
                ) : (
                  <div>
                    {profileId?.lens ? (
                      <div className="mt-1 text-xs text-gray-400">
                        {profileId?.lens ? "#" : ""}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>

              <div className="mt-1 text-xs text-gray-400">
                {profilesBalance.toFixed(3)}
              </div>
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
            <Button plain onClick={() => setOpenProfileDialog(false)}>
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
            <div className="text  text-gray-200">
              {lensProfile
                ? parseLensProfile(lensProfile, "handle")
                : `#${profileId?.home}`}
            </div>
            {!lensProfile && (
              <Field className="text-gray-400">
                <Label className="text-gray-400">
                  {"You haven't linked your Lens Profile yet"}
                </Label>
                <Input
                  onChange={handleLensLinkInputChange}
                  name="number"
                  type="number"
                  aria-label="Text"
                />
                <Button
                  fancy
                  onClick={() => linkLensProfileToHom3Profile()}
                  className="w-half"
                >
                  Link
                </Button>
              </Field>
            )}
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
