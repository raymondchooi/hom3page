import { useRouter } from "next/router"
import NFTMintingPage from "../../ui/components/NFTMintingPage"
import { makeTemplateBackendActor } from "../../ui/service/actor-locator"
import { useEffect, useState } from "react"
import { Text, VStack, Box, Button, Heading } from "@chakra-ui/react"
import { useAuth } from "../../ui/service/use-auth-client"
import LoggedOut from "../../ui/components/LoggedOut"

const UserView = () => {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const nftID = router.query.id

  const [nftData, setNftData] = useState(null)

  useEffect(() => {
    async function fetchAndSetNFTData() {
      const templateBackendActor = makeTemplateBackendActor()
      const nftData = await templateBackendActor.getNFTData(nftID)
      console.log(nftData)
      setNftData(nftData)
    }

    if (nftID) {
      fetchAndSetNFTData()
    }
  }, [nftID])

  return (
    <>
      <VStack padding="5rem 0" flex="1" alignItems="center">
        {isAuthenticated ? (
          <Box w="full" maxW="100vh" display="flex" justifyContent="end">
            <Button onClick={logout} colorScheme="blue">
              Logout
            </Button>
          </Box>
        ) : (
          <Heading
            margin="0"
            lineHeight="1.15"
            fontSize="2rem"
            textAlign="center"
          >
            Mint your NFT!
          </Heading>
        )}

        {isAuthenticated ? (
          <AuthenticatedScren nftData={nftData} nftID={nftID} />
        ) : (
          <LoggedOut />
        )}
      </VStack>
    </>
  )
}

const AuthenticatedScren = ({ nftData, nftID }) => {
  return (
    <>
      {nftData ? (
        <NFTMintingPage
          nftID={nftID}
          name={nftData.name}
          symbol={nftData.symbol}
          logoBase64={nftData.logo.data}
          totalSupply={Number(nftData.totalSupply)}
          totalNFTs={nftData.maxLimit}
        />
      ) : (
        <Text>Loading NFT collection with ID {nftID}...</Text>
      )}
    </>
  )
}

export default UserView
