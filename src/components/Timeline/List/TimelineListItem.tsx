import * as React from "react";
import { Divider, ListItem, ListItemText } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { SelectablePromptData } from "../../../services/interfaces";
import { userResponseStore } from "../../../services/stores/userResponseStore";

export const TimelineListItem = ({
  prompt,
}: {
  prompt: SelectablePromptData;
}) => {
  const promptShortened =
    prompt.prompt.length > 15
      ? prompt.prompt.substring(0, 15) + "..."
      : prompt.prompt;
  const userResponseShortened =
    prompt.userResponse.length > 30
      ? prompt.userResponse.substring(0, 30) + "..."
      : prompt.userResponse;

  return (
    <>
      <ListItem
        onClick={() => {
          userResponseStore.selectResponse(prompt);
        }}
      >
        <ListItemText
          inset
          primary={promptShortened}
          secondary={userResponseShortened}
        ></ListItemText>
        <ChevronRightIcon />
      </ListItem>
      <Divider />
    </>
  );
};

export default TimelineListItem;
