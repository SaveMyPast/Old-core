import { writable } from "svelte/store";

export const promptStore = writable(null);
export const singleRandomPromptStore = writable(null);
export const userRespondedPromptStore = writable(null);
