import { useUser } from "@auth0/nextjs-auth0/client";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import {
  Button,
  Box,
  Text,
  Heading,
  Container,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Header from "../components/Header";

function UserProfile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (user) {
    return (
      <>
        <Header />
        <Container maxW="xl" mt={20}>
          <Box p={5} borderWidth="1px" borderRadius="lg">
            <Heading size="xl">Welcome, {user.name}!</Heading>
            <Text mt={4} fontSize="lg">
              Your Marketer API Key:{" "}
              {user["https://seshatlabs.xyz/marketer_api_key"]}
            </Text>
            <Text mt={4} fontSize="lg">
              Your Publisher/DApp Developer API Key:{" "}
              {user["https://seshatlabs.xyz/publisher_api_key"]}
            </Text>
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
      <Container maxW="xl" mt={80} textAlign="center">
        <Text fontSize="xl" mb={4}>
          You are not logged in, please hit the continue to create a new account
          or login into your account.
        </Text>
        <Link as={NextLink} href="/api/auth/login">
          <Button as="a" colorScheme="blue">
            Login
          </Button>
        </Link>
      </Container>
    </>
  );
}

export default UserProfile;
