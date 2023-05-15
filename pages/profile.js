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
import axios from "axios";

function UserProfile() {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    async function createUser(user) {
      await axios.post("/api/create_user", user);
    }
    if (user) {
      createUser(user);
      console.log("User has been created");
    } else {
      console.log("User is not defined");
    }
  }, [user]);

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
        <Container maxW="xl" mt={20}>
          <Box p={5} borderWidth="1px" borderRadius="lg">
            <Heading size="xl">Welcome, {user.name}!</Heading>
            <Text mt={4} fontSize="lg">
              Your Marketer API Key:{" "}
              {user.seshat_API_keys.marketerAPIKey}
            </Text>
            <Text mt={4} fontSize="lg">
              Your Publisher/DApp Developer API Key:{" "}
              {user.seshat_API_keys.publisherAPIKey}
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
