import { SelectablePromptData } from "./../interfaces/interfaces";
import { createAdapter } from "@state-adapt/core";

const deselectAllResponses = (state: SelectablePromptData[]) => {
  const newPromptDataArray = state.map((p) => {
    return { ...p, selected: false };
  });
  return newPromptDataArray;
};

const userResponsesAdapter = createAdapter<SelectablePromptData[]>()({
  selectResponse: (
    state: SelectablePromptData[],
    selectedPrompt: SelectablePromptData
  ) => {
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
    viewSelectedResponse: (state: SelectablePromptData[]) => {
      const selectedResponse = state.find((p) => p.selected);
      return selectedResponse;
    },
    isSelected: (state: SelectablePromptData[]) => {
      const selectedResponse = state.find((p) => p.selected);
      if (selectedResponse) {
        return true;
      }
      return false;
    },
  },
});

export default userResponsesAdapter;
