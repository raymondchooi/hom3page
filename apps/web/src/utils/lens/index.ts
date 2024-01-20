import { LensClient, development } from "@lens-protocol/client";

const getLensClient = () =>
  new LensClient({
    environment: development,
  });

export default getLensClient;
