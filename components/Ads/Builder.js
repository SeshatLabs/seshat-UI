import { Box } from "@chakra-ui/react";
import styles from './builder.module.css';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';

import CampaignBuilder from './CampaignBuilder';
import CampaignHistory from "./CampaignHistory";
import Login from "../Utilities/Login";

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
                <CampaignBuilder userID={user.sub} />
                <CampaignHistory userID={user.sub} />
            </Box>
        );
    }

    return (
        <Login />
    );
}
