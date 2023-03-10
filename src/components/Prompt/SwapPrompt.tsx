import * as React from "react";
import { IconButton, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import promptStore from "../../services/stores/promptStore";
import { useStore } from "@state-adapt/react";

export const SwapPrompt = () => {
  const prompts = useStore(promptStore);
  return (
    <>
      <IconButton
        color="primary"
        sx={{ display: "flex", flexDirection: "column" }}
        onClick={() => promptStore.filterPrompt(prompts.viewFirstPrompt)}
      >
        <RefreshIcon fontSize="medium" />
        <Typography variant="caption">Swap</Typography>
      </IconButton>
    </>
  );
};

export default SwapPrompt;
