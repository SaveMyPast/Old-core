import { writable, derived } from "svelte/store";
import { sample } from "lodash";

export const promptStore = writable(null);

export const singleRandomPromptStore = derived(
  promptStore,
  ($promptStore, set) => {
    set(sample($promptStore));
  }
);
export const modifiedRandomPromptStore = writable(null);

export const userRespondedPromptStore = writable(null);
