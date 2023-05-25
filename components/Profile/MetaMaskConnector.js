import { Box, Button, Container, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMetaMask } from "../../hooks/useMetaMask";
import { MetaMaskError } from "./MetaMaskError";
export const MetaMaskConnector = () => {
  const {
    wallet,
    hasProvider,
    isConnecting,
    connectMetaMask,
    isMetaMaskInstalled,
  } = useMetaMask();

  return (
    <>
      <Box>
        {!hasProvider && (
          <Link as={NextLink} href="https://metamask.io" target="_blank">
            Install MetaMask
          </Link>
        )}
        {isMetaMaskInstalled && wallet.accounts.length < 1 && (
          <Button
            variant="outline"
            colorScheme="blue"
            disabled={isConnecting}
            onClick={connectMetaMask}
          >
            Connect MetaMask Wallet
          </Button>
        )}
      </Box>
      <Container>
        <MetaMaskError />
      </Container>
    </>
  );
};
