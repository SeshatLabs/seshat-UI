import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState } from "react";
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Container,
    Spinner,
    Flex,
    Textarea,
    Button,
    VStack,
  } from "@chakra-ui/react";
import Header from "../components/Header";
import Login from "../components/Utilities/Login";
import JSONPretty from 'react-json-pretty';


export default function queryDasboard() {
    const { user, error, isLoading } = useUser('');
    const [query, setQuery] = useState('');
    const [result, setResult] = useState('');
    const SESHAT_ENDPOINT = process.env.NEXT_PUBLIC_SESHAT_ENDPOINT;

    const handleRunQuery = async () => {
        console.log(query)
        console.log(SESHAT_ENDPOINT)
        try {
            const response = await fetch(SESHAT_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: query
                }),
            });
            const data = await response.json();
            setResult(data)
        } catch (error) {
            console.error(error)
            setResult("Error executing query")
        }
    }

    if (isLoading) {
        return (
            <div>
                <Container maxW="xl" mt={80} textAlign="center">
                    <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                    />
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <Container maxW="xl" mt={80} textAlign="center">
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Authentication Error</AlertTitle>
                    <AlertDescription>
                        {error === undefined
                        ? "Invalid user credentials. Please contact Seshat support"
                        : error.message}
                    </AlertDescription>
                </Alert>
            </Container>
        );
    }

    if (user) {
        return (
            <>
                <Header />
                <VStack spacing={10}>
                    <Box paddingTop="40px" width="70%">
                        <Textarea 
                        height="200px"
                        placeholder="Write your query here..." 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button colorScheme="purple" onClick={handleRunQuery} marginTop="10px">
                        Run
                        </Button>
                    </Box>
                    <Box 
                        border="1px solid purple" 
                        margin="20px"
                        padding="20px" 
                        width="70%" 
                        overflowY="auto" 
                        maxHeight="900px"
                        height="700px"
                    >
                        {result ? <JSONPretty id="json-pretty" data={result}></JSONPretty> : "Your query result will be shown here..."}
                    </Box>
                </VStack>
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