import { writable } from "svelte/store";

export const userAuth = writable(null);
export const userInformationStore = writable({
  isAdmin: false,
  birthdate: null,
  email: null,
  name: null,
  id: null,
});
export const userAuthFailStore = writable(null);
