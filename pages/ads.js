import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  Spinner,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import Builder from "../components/Ads/Builder";
import PublisherDashboard from "../components/Ads/PublisherDashboard";
import Selector from "../components/Ads/Selector";
import Header from "../components/Header";
import Login from "../components/Utilities/Login";
import styles from "../styles/Home.module.css";

export default function Ads() {
  const [builderSelected, setBuilderSelected] = useState(true);
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return (
      <Container maxW="xl" mt={80} textAlign="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Container>
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
      <div className={styles.container}>
        <Head>
          <title>Seshat - Ads</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div className={styles.main}>
          <Selector
            builderSelected={builderSelected}
            setBuilderSelected={setBuilderSelected}
          />
          <div className={styles.adSection}>
            <Box my="10" mx="auto" maxW="1600px">
              <Builder builderSelected={builderSelected} user={user} />
              <PublisherDashboard
                builderSelected={builderSelected}
                user={user}
              />
            </Box>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Login />
    </>
  );
}
