import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
} from "@chakra-ui/react";
import { useMetaMask } from "../../hooks/useMetaMask";

export const MetaMaskError = () => {
  const { error, errorMessage, clearError } = useMetaMask();
  return (
    <Container
      maxW="xl"
      mt={10}
      textAlign="center"
      style={error ? { backgroundColor: "red" } : { display: "none" }}
    >
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Metamask Error</AlertTitle>
        <AlertDescription>
          {error && <Box onClick={clearError}>{errorMessage}</Box>}
        </AlertDescription>
      </Alert>
    </Container>
  );
};
