import { SelectablePromptData } from "./../interfaces";
import { createAdapter } from "@state-adapt/core";

const userResponsesAdapter = createAdapter<SelectablePromptData[]>()({
  selectResponse: (
    state: SelectablePromptData[],
    selectedPrompt: SelectablePromptData
  ) => {
    const newPromptDataArray = state.map((p) => {
      if (p.id === selectedPrompt.id) {
        return { ...p, selected: !p.selected };
      }
      return p;
    });
    return newPromptDataArray;
  },
  deselectAllResponses: (state: SelectablePromptData[]) => {
    const newPromptDataArray = state.map((p) => {
      return { ...p, selected: false };
    });
    return newPromptDataArray;
  },

  selectors: {
    viewSelectedResponse: (state: SelectablePromptData[]) => {
      const selectedResponse = state.find((p) => p.selected);
      return selectedResponse;
    },
  },
});

export default userResponsesAdapter;