import { writable } from "svelte/store";

export const userAuth = writable(null);
export const userInformationStore = writable({
  isAdmin: false,
});
export const userAuthFailStore = writable(null);
