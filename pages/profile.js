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
import { useEffect } from "react";

function UserProfile() {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    // TODO: Make async function. Configure Callback URL to be this page.
    function createUser(user) {
      if (user) {
        console.log("User is created");
        console.log(user);
      } else {
        console.log("User it not defined");
      }
    }
    createUser(user);
  }, [user]); // <-- here put the parameter to listen

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message === undefined ? 'Invalid user credentials. Please contact Seshat support' : error.message}</div>;
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
          <Button colorScheme="blue">Login</Button>
        </Link>
      </Container>
    </>
  );
}

export default UserProfile;
