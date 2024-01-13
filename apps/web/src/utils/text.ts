const shortenWalletAddress = (walletAddress: string | undefined) =>
  walletAddress
    ? `${walletAddress.substring(0, 5)}..${walletAddress.substring(
        walletAddress.length - 4,
      )}`
    : "";

export { shortenWalletAddress };
