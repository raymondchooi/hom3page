import { type ChangeEvent } from "react";
import Image from "next/image";
import { useModal, Avatar } from "connectkit";
import { useAccount, useNetwork } from "wagmi";

import { Field, Label } from "components/fieldset";
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "components/dialog";
import { buildNetworkScanLink, shortenWalletAddress } from "utils/text";
import { Button, Input } from "components";
import { styles as ButtonStyles } from "components/button";
import type { BlockData } from "models/BlockData";
import { cn } from "utils/tailwind";
import { useEffect, useState } from "react";
import { CONTRACTS } from "constants/ABIs/contracts";
import { type WalletClient, useWalletClient } from "wagmi";
import { BrowserProvider, JsonRpcSigner, ethers, toBigInt } from "ethers";
import { LensClient } from "@lens-protocol/client";
import getLensClient from "utils/lens";
import { floatToHex, floatToHexBigInt, bigIntToHex } from "utils/number";
import {
  getLensProfile,
  lensProfileIdFromNumber,
} from "utils/lens/getLensProfiles";
import parseLensProfile from "utils/lens/parseLensProfile";
import { polygonMumbai } from "wagmi/chains";
import { sepolia, waitForTransaction, writeContract } from "@wagmi/core";

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
  const { chain, chains } = useNetwork();
  const { setOpen, openSwitchNetworks } = useModal();

  const [profileId, setProfileId] = useState<{
    home?: number;
    lens?: BigInt;
  }>();
  const [profilesBalance, setProfilesBalance] = useState<number>(0);
  const [lensProfile, setLensProfile] = useState<any>(null);
  const [loaded, setloaded] = useState<boolean>();
  const [profileContract, setProfileContract] = useState<ethers.Contract>();
  const [lensClient, setLensClient] = useState<LensClient>();
  const [noProfile, setNoProfile] = useState<boolean>();
  const [hash, setHash] = useState<string>();

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
    } else if (
      profileContract &&
      !profileId?.lens &&
      profileId?.home &&
      !noProfile
    ) {
      console.log("getting lens profile: ", profileId);
      getLensPro();
    }

    async function getLensPro() {
      if (!profileContract?.getProfileLensId) return;

      const lensId = await profileContract?.getProfileLensId(profileId?.home);
      if (parseInt(lensId) === 0) {
        setNoProfile(true);
        return;
      }
      console.log("got lens profile id", lensProfileIdFromNumber(lensId));
      setProfileId((prv) => ({ ...prv, lens: lensId }));

      const profile = await getLensProfile(
        lensClient!,
        lensProfileIdFromNumber(lensId),
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
  const [linkeProfileState, setLinkProfileState] = useState<number>();
  async function linkLensProfileToHom3Profile() {
    if (lensInput > 0) {
      setLinkProfileState(1);
      const prof = await getLensProfile(
        lensClient!,
        lensProfileIdFromNumber(toBigInt(lensInput)),
        "id",
      );
      if (prof?.handle?.ownedBy === address) {
        // makesure on mumbai
        if (chain?.id !== polygonMumbai.id) {
          openSwitchNetworks();
          setLinkProfileState(6);
        }
        // call contract function
        setLinkProfileState(2);

        const setProfileTx = await writeContract({
          address: profileContract?.target,
          abi: CONTRACTS.maticMumbai?.Hom3Profile?.abi,
          functionName: "setLensProfile",
          args: [profileId?.home, lensInput],
        });

        setHash(setProfileTx.hash);
        setLinkProfileState(3);

        await waitForTransaction({ hash: setProfileTx.hash });
        setNoProfile(false);
        setLinkProfileState(4);
      } else setLinkProfileState(5);
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
            <div className="flex-display-row flex w-full">
              {parseLensProfile(lensProfile, "image") ? (
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
            </div>
            <div className="text  text-gray-200">
              {parseLensProfile(lensProfile, "handle")
                ? parseLensProfile(lensProfile, "handle")
                : profileId?.home === 0
                  ? "Looks like you don't have a Hom3 Profile yet"
                  : `Hom3 #${profileId?.home}`}
            </div>
            {/** Create Hom3 Profile */}

            {/** Link Lens profile */}

            {profileId?.home === 0 && (
              <div>
                Create Hom3Profile
                <div className="flex">
                  <div className="z-[10] mt-6 flex w-full justify-center">
                    <Button
                      fancy
                      onClick={() => linkLensProfileToHom3Profile()}
                      className="w-half"
                    >
                      Get Profile
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {!parseLensProfile(lensProfile, "handle") &&
              profileId?.home !== 0 && (
                <>
                  <Field className="mt-2 text-gray-400">
                    <Label className="text-gray-400">
                      {"You haven't linked your Lens Profile yet"}
                    </Label>
                    <Input
                      onChange={handleLensLinkInputChange}
                      name="number"
                      type="number"
                      aria-label="Text"
                      placeholder="Lens Profile Id"
                    />
                    <Label className="text-gray-400">
                      {linkeProfileState === 1 &&
                        "Checking your own the Lens Profile"}
                      {linkeProfileState === 2 &&
                        "Please confirm the transaction, this will link your Hom3 & Lens profiles"}
                      {linkeProfileState === 3 && "Waiting for confirmation..."}
                      {linkeProfileState === 4 && "Lens profile linked!"}
                      {linkeProfileState === 5 &&
                        "Your address doesn't own that profile."}
                      {linkeProfileState === 6 && "Please connect to Mumbai"}

                      {hash && (
                        <a
                          href={buildNetworkScanLink({
                            network:
                              chain?.id === sepolia.id
                                ? "ethSepolia"
                                : chain?.id === polygonMumbai.id
                                  ? "maticMumbai"
                                  : "eth",
                            txHash: hash,
                          })}
                          target={"_blank"}
                        >
                          See transaction
                        </a>
                      )}
                    </Label>
                  </Field>

                  <div className="flex">
                    <div className="z-[10] mt-6 flex w-full justify-center">
                      <Button
                        fancy
                        onClick={() => linkLensProfileToHom3Profile()}
                        className="w-half"
                      >
                        Link
                      </Button>
                    </div>
                  </div>
                </>
              )}
          </DialogBody>
        </Dialog>
      )}
    </>
  );
}

export default Profile;
