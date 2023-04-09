
import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Select
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('A');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  const router = useRouter();
  const { user } = useUser();


  // Check if user is already authenticated
  if (user) {
    router.push('/profile');
    return null;
  }
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleLogin = async (event) => {
    
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await fetch(process.env.AUTH0_ISSUER_BASE_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          client_id: process.env.AUTH0_CLIENT_ID,
          email,
          password,
          connection: "Username-Password-Authentication",
          user_metadata: { role },
        }),
      });

    setIsLoading(false);
    const data = await response.json();
    console.log(response)

    if (response.ok) {
      setIsSuccess(true);
    } else {
      setIsError(true);
      setErrorMessage(data.message);
      handleLogin(event)
    }
  };

  return (
    <center>
        <Box w="full" maxW="md" margin="20">
        <p>Please enter the followings, if you don't have an account, it will crate your account, then log you in, otherwise it just log you in.</p>
        <form>
            {isError && (
            <Alert status="error" mb={4}>
                <AlertIcon />
                <AlertTitle mr={2}>Error!</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
            )}
            {isSuccess && (
            <Alert status="success" mb={4}>
                <AlertIcon />
                <AlertTitle mr={2}>Success!</AlertTitle>
                <AlertDescription>You have successfully registered.</AlertDescription>
            </Alert>
            )}
            <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
            />
            </FormControl>
            <FormControl id="password" isRequired mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
            />
            </FormControl>
            <FormControl id="role" isRequired mb="4">
                <FormLabel>Role</FormLabel>
                <Select value={role} onChange={handleRoleChange}>
                <option value="Marketer">Marketer</option>
                <option value="dApp Developer or Publisher">
                    dApp Developer or Publisher
                </option>
                </Select>
            </FormControl>
            <Button type="submit" isLoading={isLoading} loadingText="Submitting...">
            Signup
            </Button>
        </form>
        </Box>
    </center>
  );
}
