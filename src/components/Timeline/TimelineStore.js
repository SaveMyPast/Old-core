import { writable } from "svelte/store";

export const selectedPromptStore = writable({
  promptData: {
    prompt: "",
    userResponse: "",
    age: "",
    year: "",
  },
});
