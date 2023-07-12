import { useStore } from "@state-adapt/react";
import * as React from "react";
import { promptStore } from "../../../services/stores/promptStore";
import { List } from "@mui/material";
import PromptView from "../../general/prompt/PromptView";

const AdminViewPrompts = () => {
  const prompts = useStore(promptStore);

  return (
    <>
      <List>
        {prompts.allPrompts.map((prompt, key) => (
          <PromptView prompt={prompt} key={key} />
        ))}
      </List>
    </>
  );
};

export default AdminViewPrompts;
