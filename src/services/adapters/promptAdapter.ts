import { PromptStoreInterface } from "./../interfaces/PromptStoreInterface";
import { ModifyPromptPayload, PromptData } from "./../interfaces/interfaces";
import { createAdapter } from "@state-adapt/core";

const reset = (state: PromptStoreInterface) => {
  return {
    prompts: state.immutablePrompts,
    immutablePrompts: state.immutablePrompts,
  };
};

const promptAdapter = createAdapter<PromptStoreInterface>()({
  modifyPrompt: (
    store: PromptStoreInterface,
    promptPayload: ModifyPromptPayload
  ) => {
    const state = reset(store);
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
  filterByPrompt: (store: PromptStoreInterface, prompt: PromptData) => {
    const state = reset(store);
    const filteredPromptDataArray = state.prompts.filter(
      (p) => p.id !== prompt.id
    );
    return {
      prompts: filteredPromptDataArray,
      immutablePrompts: state.immutablePrompts,
    };
  },
  filterPromptsByTag: (store: PromptStoreInterface, tag: string) => {
    const state = reset(store);

    const filteredPromptDataArray = state.prompts.filter((p) => {
      return p.tags.includes(tag);
    });

    if (tag === "all tags") return reset(store);
    return {
      prompts: filteredPromptDataArray,
      immutablePrompts: state.immutablePrompts,
    };
  },

  reset,

  selectors: {
    viewFirstPrompt: (state: PromptStoreInterface) => {
      return state.immutablePrompts[0];
    },
    getAllTags: (state: PromptStoreInterface) => {
      let tags: string[] = ["all tags"];
      state.immutablePrompts.forEach((prompt) => {
        prompt.tags.forEach((tag) => {
          if (tags.find((t) => t === tag) === undefined) tags.push(tag);
        });
      });
      return tags;
    },
    allPrompts: (state: PromptStoreInterface) => {
      return state.immutablePrompts;
    },
  },
});

export default promptAdapter;
