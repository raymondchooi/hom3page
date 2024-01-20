import { Box, Image, Text, Button } from "@chakra-ui/react";

const NFTMintingPage = ({ name, symbol, logoBase64, totalSupply, totalNFTs }) => {

  return (
    <Box textAlign="center" fontSize="xl">
      <Text fontSize="6xl" fontWeight="bold">{symbol}</Text>
      <Image
        boxSize="200px"
        src={`data:image/png;base64,${logoBase64}`}
        alt={name}
        m="auto"
      />
      <Text fontSize="4xl">{name}</Text>
      <Text fontSize="2xl">{`${totalNFTs - totalSupply} out of ${totalNFTs} NFTs left to be minted`}</Text>
      <Button>Mint</Button>
    </Box>
  );
};

export default NFTMintingPage;
