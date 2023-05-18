import { Box, Text, Tag } from "@chakra-ui/react";
import styles from "./builder.module.css";
import { useState } from "react";
import axios from "axios";

export default function PublisherDashboard({ builderSelected, user }) {
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    async function getRevenue(userID) {
      const user = await axios.get("/api/get_user", {
        params: {
          userID: userID,
        },
      });
      return user.data.revenue;
    }
    const revenue = getRevenue(user.userID);
    setRevenue(revenue);
  }, []);

  return (
    <Box
      className={`${styles.builder} ${builderSelected ? styles.noDisplay : ""}`}
    >
      <Text fontSize="lg">
        <Tag color="black" fontWeight="bold" fontSize="lg">
          Your Publisher/DApp Developer API Key:{" "}
        </Tag>
        {user.seshat_API_keys.publisherAPIKey}
      </Text>

      <Text fontSize="lg">
        <Tag color="black" fontWeight="bold" fontSize="lg">
          Revenue:{" "}
        </Tag>
        {revenue}
      </Text>
    </Box>
  );
}
