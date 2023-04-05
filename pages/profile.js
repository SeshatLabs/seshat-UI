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
    const role = user['https://seshatlabs.xyz/role'];

    return (
      <Container maxW="xl" mt={20}>
        <Box p={5} borderWidth="1px" borderRadius="lg">
          <Heading size="xl">Welcome, {user.name}!</Heading>
          <Text mt={4} fontSize="lg">
            Your role: {role}
          </Text>
          <Text mt={4} fontSize="lg">
            Your API Key: {user['https://seshatlabs.xyz/api_key']}
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
    <>
        <p>Please log in.</p>
        <a href="/api/auth/login">Login</a>
    </>
  ) 
}

export default UserProfile;
