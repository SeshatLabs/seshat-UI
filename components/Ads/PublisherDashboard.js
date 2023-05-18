import { Box } from "@chakra-ui/react";
import styles from "./builder.module.css";

export default function PublisherDashboard({ builderSelected }) {
  return (
    <Box
      className={`${styles.builder} ${builderSelected ? styles.noDisplay : ""}`}
    ></Box>
  );
}
