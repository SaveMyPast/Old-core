import * as React from "react";

import { Divider, Stack, Typography } from "@mui/material";

import { PromptData } from "../../../services/interfaces/interfaces";

import PromptMetaData from "./PromptMetaData";

export const PromptView = ({
  prompt,
  isEditable = false,
}: {
  prompt: PromptData;
  isEditable?: boolean;
}) => {
  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h5">{prompt.prompt}</Typography>
        <PromptMetaData
          prompt={prompt}
          tags={prompt.tags}
          isEditable={isEditable}
        />
        {prompt.userResponse && <Typography>{prompt.userResponse}</Typography>}

        <Divider />
      </Stack>
    </>
  );
};

export default PromptView;
