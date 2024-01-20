import { Box, Image, Text, Button } from "@chakra-ui/react"
import { makeTemplateBackendActor } from "../service/actor-locator"
import { useAuth } from "../service/use-auth-client"
import { useState } from "react"

const NFTMintingPage = ({
  nftID,
  name,
  symbol,
  logoBase64,
  totalSupply,
  totalNFTs
}) => {
  const { principal } = useAuth()

  const [mintingResult, setMintingResult] = useState(null)

  async function mint() {
    const templateBackendActor = makeTemplateBackendActor()
    console.log(nftID)
    const mintedResult = await templateBackendActor.mintNFT(nftID, principal)

    console.log(mintedResult)
    setMintingResult(mintedResult)
  }

  return (
    <Box textAlign="center" fontSize="xl">
      <Text fontSize="6xl" fontWeight="bold">
        {symbol}
      </Text>
      <Image boxSize="200px" src={`${logoBase64}`} alt={name} m="auto" />
      <Text fontSize="4xl">{name}</Text>
      {/* <Text fontSize="xl">{`${
        totalNFTs - totalSupply
      } out of ${totalNFTs} NFTs left to be minted`}</Text> */}
      <Button onClick={mint}>Mint</Button>
      {mintingResult?.Ok && (
        <>
          <Text color="green" fontWeight="green">
            Minted token ID: {mintingResult.Ok.token_id.toString()}
          </Text>
          <Text color="green" fontWeight="green">
            Transaction ID: {mintingResult.Ok.id.toString()}
          </Text>
        </>
      )}
      {mintingResult?.Err && (
        <Text color="red" fontWeight="bold">
          Error: {Object.keys(mintingResult.Err)[0]}
        </Text>
      )}
    </Box>
  )
}

export default NFTMintingPage
