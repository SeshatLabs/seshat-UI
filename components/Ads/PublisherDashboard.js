import { Box } from "@chakra-ui/react";
import styles from "./builder.module.css";

export default function PublisherDashboard({ builderSelected, user }) {
  return (
    <Box
      className={`${styles.builder} ${builderSelected ? styles.noDisplay : ""}`}
    ></Box>
  );
}
