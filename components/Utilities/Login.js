import NextLink from "next/link";
import { Button, Text, Link, Container } from "@chakra-ui/react";

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
