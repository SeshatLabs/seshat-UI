
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

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('A');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
    
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await fetch(`https://dev-1g47g0eh5tt1i6xh.us.auth0.com/dbconnections/signup`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          client_id: `Me7EOYWWcUaaskVILJ5prwHr0R4na9yo`,
          email,
          password,
          connection: "Username-Password-Authentication",
          user_metadata: { role },
        }),
      });

    setIsLoading(false);
    const data = await response.json();

    if (response.ok) {
      setIsSuccess(true);
    } else {
      setIsError(true);
      setErrorMessage(data.message);
    }
  };

  return (
    <center>
        <Box w="full" maxW="md" margin="20">
        <form onSubmit={handleSubmit}>
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
