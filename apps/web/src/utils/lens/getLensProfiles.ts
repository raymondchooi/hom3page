import { LensClient } from "@lens-protocol/client";
import { bigIntToHex } from "utils/number";

const getLensProfile = async (
  client: LensClient,
  value: string,
  type: "address" | "id",
) => {
  let profile;
  if (type === "id") {
    profile = await client?.profile.fetch({
      forProfileId: value,
    });
  } else {
    client?.profile.fetchAll({
      where: {
        ownedBy: [value],
      },
    });
  }

  return profile;
};

const lensProfileIdFromNumber = (input: BigInt) => bigIntToHex(input);

export { getLensProfile, lensProfileIdFromNumber };
