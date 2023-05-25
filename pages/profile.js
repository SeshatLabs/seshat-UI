import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Box,
  Button,
  Container,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Flex,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useMetaMask } from "../hooks/useMetaMask";
import Header from "../components/Header";
import { MetaMaskConnector } from "../components/Profile/MetaMaskConnector";
import { MetaMaskWalletInfo } from "../components/Profile/MetaMaskWalletInfo";
import Login from "../components/Utilities/Login";

function UserProfile() {
  const { user, error, isLoading } = useUser();
  const { wallet, hasProvider } = useMetaMask();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error:{" "}
        {error.message === undefined
          ? "Invalid user credentials. Please contact Seshat support"
          : error.message}
      </div>
    );
  }

  if (user) {
    return (
      <>
        <Header />
        <Container maxW="3xl" mt={20}>
          <Box p={5} borderWidth="1px" borderRadius="lg">
            <Heading size="xl">Welcome, {user.name}!</Heading>
            <Text mt={4} fontSize="lg">
              Your Marketer API Key: {user.seshat_API_keys.marketerAPIKey}
            </Text>
            <Text mt={4} fontSize="lg">
              Your Publisher/DApp Developer API Key:{" "}
              {user.seshat_API_keys.publisherAPIKey}
            </Text>

            <Spacer mt={4} />

            {hasProvider && wallet.accounts.length > 0 ? (
              <MetaMaskWalletInfo />
            ) : (
              <>
                <Text fontSize="lg">
                  Add Wallet: To create an actual campaign you need to deposit
                  fund, or to withdraw your revenue as a publisher
                </Text>
                <Spacer mt={4} />
                <MetaMaskConnector />
              </>
            )}

            <Spacer mt={6} />
            <Menu>
              <MenuButton as={Button} colorScheme="blue">
                Account
              </MenuButton>
              <MenuList>
                <MenuItem as={NextLink} href="/api/auth/logout">
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Login />
    </>
  );
}

export default UserProfile;
