import { Box, Text, Center, Button, Flex, Spacer } from "@chakra-ui/react";
import styles from "./builder.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PublisherDashboard({ builderSelected, user }) {
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    let gotRevenue = false;
    async function getRevenue(userID) {
      const user = await axios.get("/api/get_user", {
        params: {
          userID: userID,
        },
      });
      if (!user || !user.data.data) {
        throw "Could not find user";
      }
      const revenue = user.data.data.revenue;
      if (!gotRevenue) {
        setRevenue(revenue);
      }
    }
    getRevenue(user.sub).catch(console.error);
    return () => (gotRevenue = true);
  }, [revenue]);

  const handleWithdraw = (e) => {};

  return (
    <Box
      className={`${styles.builder} ${builderSelected ? styles.noDisplay : ""}`}
    >
      <Text as="b" fontSize="lg">
        Your Publisher/DApp Developer API Key
      </Text>
      <Center h="100px">
        <Text fontSize="md">{user.seshat_API_keys.publisherAPIKey}</Text>
      </Center>

      <br />

      <Text as="b" fontSize="lg">
        Revenue
      </Text>
      <Center h="100px">
        <Text fontSize="md">{revenue}</Text>
      </Center>
      <Flex>
        <Spacer />
        <Button variant="outline" colorScheme="blue" onClick={handleWithdraw}>
          Withdraw
        </Button>
      </Flex>
    </Box>
  );
}
