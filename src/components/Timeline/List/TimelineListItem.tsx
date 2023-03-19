import * as React from "react";
import { Divider, IconButton, ListItem, ListItemText } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { SelectablePromptData } from "../../../services/interfaces";
import { userResponseStore } from "../../../services/stores/userResponseStore";

const shortenString = (string: string) => {
  const colWidth = window.innerWidth / 12;
  const numChars = Math.floor((colWidth / 10) * 4);
  return string.length > numChars
    ? string.substring(0, numChars) + "..."
    : string;
};

export const TimelineListItem = ({
  prompt,
}: {
  prompt: SelectablePromptData;
}) => {
  const promptShortened = shortenString(prompt.prompt);

  return (
    <>
      <ListItem>
        <ListItemText secondary={promptShortened}></ListItemText>
        <IconButton
          onClick={() => {
            userResponseStore.selectResponse(prompt);
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default TimelineListItem;
