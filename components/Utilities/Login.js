import { Button, Container, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Login() {
  return (
    <Container maxW="xl" mt={80} textAlign="center">
      <Text fontSize="xl" mb={4}>
        You are not logged in, please hit the continue to create a new account
        or login into your account.
      </Text>
      <Link as={NextLink} href="/api/auth/login">
        <Button colorScheme="blue">Login</Button>
      </Link>
    </Container>
  );
}
