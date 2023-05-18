import { Box } from "@chakra-ui/react";
import styles from "./builder.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function PublisherDashboard({ builderSelected }) {
  const { user, error, isLoading } = useUser();

  return (
    <Box
      className={`${styles.builder} ${builderSelected ? styles.noDisplay : ""}`}
    ></Box>
  );
}
