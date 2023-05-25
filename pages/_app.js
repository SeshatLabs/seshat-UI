import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { MetaMaskContextProvider } from "../hooks/useMetaMask";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <UserProvider>
      <ChakraProvider>
        <MetaMaskContextProvider>
          <Component {...pageProps} />
        </MetaMaskContextProvider>
      </ChakraProvider>
    </UserProvider>
  );
}

export default MyApp;
