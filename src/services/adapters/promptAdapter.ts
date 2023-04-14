import { PromptStoreInterface } from "./../interfaces/PromptStoreInterface";
import { ModifyPromptPayload, PromptData } from "./../interfaces/interfaces";
import { createAdapter } from "@state-adapt/core";

const promptAdapter = createAdapter<PromptStoreInterface>()({
  addPrompt: (state: PromptStoreInterface, prompt: PromptData) => {
    const newPromptDataArray = [...state.prompts];
    return {
      prompts: newPromptDataArray,
      immutablePrompts: state.immutablePrompts,
    };
  },
  modifyPrompt: (
    state: PromptStoreInterface,
    promptPayload: ModifyPromptPayload
  ) => {
    const modifiedPromptDataArray = state.prompts.map((p) => {
      if (p.id === promptPayload.current.id) {
        return promptPayload.new;
      }
      return p;
    });
    return {
      prompts: modifiedPromptDataArray,
      immutablePrompts: state.immutablePrompts,
    };
  },
  filterByPrompt: (state: PromptStoreInterface, prompt: PromptData) => {
    const filteredPromptDataArray = state.prompts.filter(
      (p) => p.id !== prompt.id
    );
    return {
      prompts: filteredPromptDataArray,
      immutablePrompts: state.immutablePrompts,
    };
  },
  filterPromptsByTag: (state: PromptStoreInterface, tag: string) => {
    const filteredPromptDataArray = state.prompts.filter((p) => {
      return p.tags.includes(tag);
    });
    return {
      prompts: filteredPromptDataArray,
      immutablePrompts: state.immutablePrompts,
    };
  },
  reset: (state: PromptStoreInterface) => {
    return {
      prompts: state.immutablePrompts,
      immutablePrompts: state.immutablePrompts,
    };
  },
  selectors: {
    viewFirstPrompt: (state: PromptStoreInterface) => {
      return state.prompts[0];
    },
    getAllTags: (state: PromptStoreInterface) => {
      let tags: string[] = [];
      state.immutablePrompts.forEach((prompt) => {
        prompt.tags.forEach((tag) => {
          tags.push(tag);
        });
      });
      return tags;
    },
    allPrompts: (state: PromptStoreInterface) => {
      return state.prompts;
    },
  },
});

export default promptAdapter;
