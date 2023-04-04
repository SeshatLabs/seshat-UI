import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"

function MyApp({ 
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
