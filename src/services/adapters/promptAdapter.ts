import { ModifyPromptPayload, PromptData } from "./../interfaces";
import { createAdapter } from "@state-adapt/core";

const promptAdapter = createAdapter<PromptData[]>()({
  addPrompt: (state: PromptData[], prompt: PromptData) => {
    const newPromptDataArray = [...state, prompt];
    return newPromptDataArray;
  },
  modifyPrompt: (state: PromptData[], promptPayload: ModifyPromptPayload) => {
    const modifiedPromptDataArray = state.map((p) => {
      if (p.id === promptPayload.current.id) {
        return promptPayload.new;
      }
      return p;
    });
    return modifiedPromptDataArray;
  },
  filterPrompt: (state: PromptData[], prompt: PromptData) => {
    const filteredPromptDataArray = state.filter((p) => p.id !== prompt.id);
    return filteredPromptDataArray;
  },
  selectors: {
    viewFirstPrompt: (state: PromptData[]) => {
      return state[0];
    },
  },
});

export default promptAdapter;
