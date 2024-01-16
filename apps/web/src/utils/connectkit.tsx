"use client";

import { WagmiConfig, createConfig } from "wagmi";
import { sepolia, optimismGoerli, polygonMumbai } from "wagmi/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const chains = [sepolia, optimismGoerli, polygonMumbai];

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID,
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",

    // Required
    appName: "hom3page",

    // Optional
    chains,
    appDescription: "Home of web3",
    appUrl: "https://www.hom3page.com", // your app's url
    appIcon: "https://www.hom3page.com/logo_plain.jpg", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

export const ConnectkitProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme="midnight">{children}</ConnectKitProvider>
    </WagmiConfig>
  );
};
