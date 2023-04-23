import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <UserProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  );
}

export default MyApp;
