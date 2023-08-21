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
    const filteredPromptDataArray = state.prompts.filter((p) => {
      return p.id !== prompt.id;
    });
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

    if (tag === "all prompts") return reset(store);
    return {
      prompts: filteredPromptDataArray,
      immutablePrompts: state.immutablePrompts,
    };
  },

  deleteActivePromptTag: (
    store: PromptStoreInterface,
    payload: { tag: string; prompt: PromptData }
  ) => {
    const filteredPromptDataArray = store.prompts.map((p) => {
      if (p.id === payload.prompt.id) {
        return {
          ...p,
          tags: p.tags.filter((t) => t !== payload.tag),
        };
      }
      return p;
    });

    return {
      prompts: filteredPromptDataArray,
      immutablePrompts: store.immutablePrompts,
    };
  },

  addActivePromptTags: (
    store: PromptStoreInterface,
    payload: { tags: string[]; prompt: PromptData }
  ) => {
    const filteredPromptDataArray = store.prompts.map((p) => {
      if (p.id === payload.prompt.id) {
        return {
          ...p,
          tags: payload.tags,
        };
      }
      return p;
    });

    return {
      prompts: filteredPromptDataArray,
      immutablePrompts: store.immutablePrompts,
    };
  },

  setActivePrompt: (store: PromptStoreInterface, prompt: PromptData) => {
    const activePromptArray = store.prompts.map((p) => {
      if (p.id === prompt.id) {
        return { ...p, activePrompt: true };
      }
      return { ...p, activePrompt: false };
    });

    return {
      prompts: activePromptArray,
      immutablePrompts: store.immutablePrompts,
    };
  },
  toggleViewedPrompt: (store: PromptStoreInterface, prompt: PromptData) => {
    const viewedPromptArray = store.prompts.map((p) => {
      if (p.id === prompt.id) {
        return { ...p, viewedPrompt: true };
      }
      return { ...p };
    });
    return {
      prompts: viewedPromptArray,
      immutablePrompts: store.immutablePrompts,
    };
  },

  reset,

  selectors: {
    viewFirstPrompt: (state: PromptStoreInterface) => {
      return state.prompts[0];
    },

    viewActivePrompt: (state: PromptStoreInterface) => {
      const activePrompt = state.prompts.filter((p) => {
        if (p.activePrompt) return p;
      })[0];

      return activePrompt?.activePrompt ? activePrompt : state.prompts[0];
    },

    nextUnviewedPrompt: (state: PromptStoreInterface) => {
      const activePrompt = state.prompts.filter((p) => {
        if (p.activePrompt) return p;
      })[0];

      const unviewedPrompt = state.prompts.map((p, i) => {
        if (activePrompt === undefined) return state.prompts[0];
        if (p.id === activePrompt.id) {
          return state.prompts[i + 1];
        }
      });

      return unviewedPrompt[0] ? unviewedPrompt[0] : state.prompts[0];
    },

    getAllTags: (state: PromptStoreInterface) => {
      let tags: string[] = ["all prompts"];
      state.immutablePrompts.forEach((prompt) => {
        prompt.tags.forEach((tag) => {
          if (tags.find((t) => t === tag) === undefined) tags.push(tag);
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
