import { Text, Box, Container, Button } from "@chakra-ui/react";
import styles from './builder.module.css';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';

import CampaignBuilder from './CampaignBuilder';
import CampaignHistory from "./CampaignHistory";

export default function Builder({ builderSelected }) {
    const { user, error, isLoading } = useUser();
    const router = useRouter();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message === undefined ? "Unauthorized usage of auth0" : error.message}</div>;
    };

    if (user) {
        return (
            <Box className={`${styles.builder} ${builderSelected ? '' : styles.noDisplay}`}>
                <CampaignBuilder user_sid={user.sid} />
                <CampaignHistory user_sid={user.sid} />
            </Box>
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
