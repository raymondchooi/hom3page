import "../ui/styles/global.css"
import { ChakraProvider } from "@chakra-ui/react"
import { AuthProvider } from "../ui/service/use-auth-client"

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}
