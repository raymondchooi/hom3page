/* eslint-disable @next/next/no-img-element */
// Next, React
import Head from "next/head"
import { Box, Heading, VStack, Button } from "@chakra-ui/react"
import { DataSection } from "../ui/components/DataSection"
import LoggedOut from "../ui/components/LoggedOut"
import { useAuth } from "../ui/service/use-auth-client"

function HomePage() {
  const { isAuthenticated, logout } = useAuth()
  return (
    <>
      <Box minHeight="100vh" padding="0 0.5rem">
        <Head>
          <title>NFT creator template</title>
        </Head>
        <VStack padding="5rem 0" flex="1" alignItems="center">
          {isAuthenticated && (
            <Box w="full" maxW="100vh" display="flex" justifyContent="end">
              <Button onClick={logout} colorScheme="blue">
                Logout
              </Button>
            </Box>
          )}
          <Heading
            margin="0"
            lineHeight="1.15"
            fontSize="2rem"
            textAlign="center"
          >
            Create your own NFT collection!
          </Heading>

          {isAuthenticated ? <DataSection /> : <LoggedOut />}
        </VStack>
      </Box>
    </>
  )
}

export default HomePage
