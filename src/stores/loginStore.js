import { writable } from "svelte/store";

export const displayLogInBulletin = writable(false);
export const displaySignUpBulletin = writable(false);
export const userAuth = writable(null);
export const userInformation = writable(null);
