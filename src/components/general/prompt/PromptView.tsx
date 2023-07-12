import * as React from "react";

import { Divider, Stack, Typography } from "@mui/material";

import { PromptData } from "../../../services/interfaces/interfaces";

import PromptMetaData from "./PromptMetaData";

export const PromptView = ({ prompt }: { prompt: PromptData }) => {
  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h5">{prompt.prompt}</Typography>
        <PromptMetaData prompt={prompt} />
        {prompt.userResponse && <Typography>{prompt.userResponse}</Typography>}

        <Divider />
      </Stack>
    </>
  );
};

export default PromptView;
