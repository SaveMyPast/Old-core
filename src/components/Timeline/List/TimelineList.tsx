import { List } from "@mui/material";
import * as React from "react";
import TimelineListItem from "./TimelineListItem";
import { useStore } from "@state-adapt/react";
import { userResponseStore } from "../../../services/stores/userResponseStore";

export const TimelineList = () => {
  const selectablePrompts = useStore(userResponseStore);

  if (!selectablePrompts.state) {
    return (
      <>
        <div>loading</div>
      </>
    );
  }

  return (
    <>
      <List>
        {selectablePrompts.state.map((prompt, key) => (
          <TimelineListItem key={key} prompt={prompt} />
        ))}
      </List>
    </>
  );
};

export default TimelineList;
