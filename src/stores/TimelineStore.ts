import { writable } from "svelte/store";

export const selectedPromptStore = writable({
  promptData: {
    prompt: "",
    userResponse: "",
    age: 0,
    year: "",
    positive: false,
  },
});
