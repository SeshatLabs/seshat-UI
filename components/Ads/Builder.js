import { Box } from "@chakra-ui/react";
import styles from "./builder.module.css";

import CampaignBuilder from "./CampaignBuilder";
import CampaignHistory from "./CampaignHistory";

export default function Builder({ builderSelected, user }) {
  return (
    <Box
      className={`${styles.builder} ${builderSelected ? "" : styles.noDisplay}`}
    >
      <CampaignBuilder userID={user.sub} />
      <CampaignHistory userID={user.sub} />
    </Box>
  );
}
