import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../service/use-auth-client";

function LoggedOut() {
  const { login } = useAuth()

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap="4" mt="4">
      <Heading as="h2" size="md">
        You are not authenticated
      </Heading>
      <Button id="loginButton" onClick={login}>
        Log in
      </Button>
    </Box>
  )
}

export default LoggedOut
