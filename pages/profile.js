import { useUser } from '@auth0/nextjs-auth0/client';
import { Button, Box, Text, Heading, Container, Spacer, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import axios from 'axios';


function UserProfile() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (user) {
    return (
      <Container maxW="xl" mt={20}>
        <Box p={5} borderWidth="1px" borderRadius="lg">
          <Heading size="xl">Welcome, {user.name}!</Heading>
          <Text mt={4} fontSize="lg">
            Your Marketer API Key: {user['https://seshatlabs.xyz/marketer_api_key']}
          </Text>
          <Text mt={4} fontSize="lg">
            Your Publisher/DApp Developer API Key: {user['https://seshatlabs.xyz/publisher_api_key']}
          </Text>
          <Spacer mt={6} />
          <Menu>
            <MenuButton as={Button} colorScheme="blue">
              Account
            </MenuButton>
            <MenuList>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="xl" mt={80} textAlign="center">
      <Text fontSize="xl" mb={4}>
        You are not logged in, please hit the continue to create a new account or login into your account.
      </Text>
      <Button colorScheme="blue" onClick={() => router.push('/api/auth/login')}>
        Login
      </Button>
    </Container>
  );
}

export default UserProfile;
