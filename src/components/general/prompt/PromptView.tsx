import * as React from "react";

import { Divider, Stack, Typography, Chip } from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationIcon from "@mui/icons-material/LocationOn";
import { Bookmarks } from "@mui/icons-material";
import { PromptData } from "../../../services/interfaces/interfaces";

const PromptMetaData = (prompt: PromptData) => {
  return (
    <>
      <Stack direction="row" alignItems={"center"} spacing={2}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <DateRangeIcon />
          <Typography variant="caption">{prompt.year}</Typography>
          <Typography variant="caption">Age {prompt.age}</Typography>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <LocationIcon />
          <Typography variant="caption">{prompt.location}</Typography>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack direction={"row"} spacing={1}>
          <Bookmarks />
          {prompt.tags.map((tag) => (
            <Chip variant="outlined" key={tag} label={tag} size="small" />
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export const PromptView = (prompt: PromptData) => {
  if (prompt.userResponse === undefined)
    return (
      <>
        <Stack spacing={2}>
          <Typography variant="h5">{prompt.prompt}</Typography>
          <PromptMetaData {...prompt} />
          <Divider />
        </Stack>
      </>
    );

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h5">{prompt.prompt}</Typography>
        <PromptMetaData {...prompt} />
        <Divider />
        <Typography variant="body1">{prompt.userResponse}</Typography>
      </Stack>
    </>
  );
};

export default PromptView;
