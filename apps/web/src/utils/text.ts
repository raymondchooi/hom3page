import { ChainName } from "constants/ABIs/contracts";

const shortenWalletAddress = (walletAddress: string | undefined) =>
  walletAddress
    ? `${walletAddress.substring(0, 5)}..${walletAddress.substring(
        walletAddress.length - 4,
      )}`
    : "";

const buildNetworkScanLink = ({
  network,
  address,
  tokenId,
  block,
  txHash,
}: buildNetworkScanLinkInterface) => {
  if (!network) network = "maticMumbai";
  if (address && tokenId)
    return `${etherscanPrefix[network]}/token/${address}?a=${tokenId}`;

  if (block) return `${etherscanPrefix[network]}/block/${block}`;

  if (txHash) return `${etherscanPrefix[network]}/tx/${txHash}`;

  if (address && !tokenId)
    return `${etherscanPrefix[network]}/address/${address}`;

  return etherscanPrefix[network];
};

export interface buildNetworkScanLinkInterface {
  network: ChainName;
  address?: string;
  tokenId?: number;
  block?: number;
  txHash?: string;
}

const etherscanPrefix: { [chain in ChainName]?: string } = {
  eth: "https://etherscan.io",
  ethGoerli: "https://goerli.etherscan.io",
  ethSepolia: "https://sepolia.etherscan.io",
  matic: "https://polygonscan.com",
  maticMumbai: "https://mumbai.polygonscan.com",
  arbitrum: "https://arbiscan.io/",
  arbGoerli: "https://goerli.arbiscan.io",
  optimism: "https://optimistic.etherscan.io",
  opGoerli: "https://goerli-optimism.etherscan.io",
};

export { shortenWalletAddress, buildNetworkScanLink, etherscanPrefix };
