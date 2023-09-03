import * as React from "react";

import { Divider, Stack, Typography } from "@mui/material";

import { PromptData } from "../../../services/interfaces/interfaces";

import PromptMetaData from "./PromptMetaData";

export const PromptView = ({ prompt }: { prompt: PromptData }) => {
  return (
    <>
      <Stack spacing={2} className="w-full">
        <Typography textAlign={"center"} variant="h5">
          {prompt.prompt}
        </Typography>
        <PromptMetaData prompt={prompt} />
        {prompt.userResponse && (
          <Typography justifyContent={"center"}>
            {prompt.userResponse}
          </Typography>
        )}

        <Divider />
      </Stack>
    </>
  );
};

export default PromptView;
