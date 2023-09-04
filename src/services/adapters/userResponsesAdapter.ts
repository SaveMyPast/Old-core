import { PromptData } from "./../interfaces/interfaces";
import { createAdapter } from "@state-adapt/core";

const deselectAllResponses = (state: PromptData[]) => {
  const newPromptDataArray = state.map((p) => {
    return { ...p, selected: false };
  });
  return newPromptDataArray;
};

const userResponsesAdapter = createAdapter<PromptData[]>()({
  selectResponse: (state: PromptData[], selectedPrompt: PromptData) => {
    const prompts = deselectAllResponses(state);
    const newPromptDataArray = prompts.map((p) => {
      if (p.id === selectedPrompt.id) {
        return { ...p, selected: !p.selected };
      }
      return p;
    });
    return newPromptDataArray;
  },
  deselectAllResponses: deselectAllResponses,

  selectors: {
    selectedResponse: (state: PromptData[]) => {
      const selectedResponse = state.find((p) => p.selected);
      return selectedResponse;
    },
    isSelected: (state: PromptData[]) => {
      const selectedResponse = state.find((p) => p.selected);
      if (selectedResponse) {
        return true;
      }
      return false;
    },
  },
});

export default userResponsesAdapter;
