import * as React from "react";
import { IconButton, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { promptStore } from "../../services/stores/promptStore";
import { useStore } from "@state-adapt/react";
import { promptFormStore } from "./PromptFormStore/PromptFormStore";

export const SwapPrompt = () => {
  const prompts = useStore(promptStore);
  return (
    <>
      <IconButton
        color="primary"
        sx={{ display: "flex", flexDirection: "column" }}
        onClick={() => {
          promptStore.setActivePrompt(prompts.nextUnviewedPrompt);
          promptFormStore.reset();
        }}
      >
        <RefreshIcon fontSize="medium" />
        <Typography variant="caption">Swap</Typography>
      </IconButton>
    </>
  );
};

export default SwapPrompt;
