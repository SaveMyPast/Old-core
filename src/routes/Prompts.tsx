import * as React from "react";

import ViewPrompt from "../components/Prompt/ViewPrompt";
import WritePrompt from "../components/Prompt/WritePrompt";
import { useStore } from "@state-adapt/react";
import { promptStore } from "../services/stores/promptStore";

const Prompts = () => {
  const prompts = useStore(promptStore);

  return (
    <>
      <ViewPrompt prompt={prompts.viewFirstPrompt} />
      <WritePrompt prompt={prompts.viewFirstPrompt} />
    </>
  );
};

export default Prompts;
