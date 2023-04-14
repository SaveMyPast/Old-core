import { adapt } from "../../state-adapt";
import { toSource } from "@state-adapt/rxjs";
import promptAdapter from "../adapters/promptAdapter";
import prompts$ from "../db/prompts";
import { PromptData } from "../interfaces/interfaces";

export const emptyPromptData: PromptData = {
  id: "",
  age: 0,
  prompt: "",
  tags: [],
  userResponse: "",
  year: "",
  location: "",
};

const emptyPromptStore = {
  prompts: [emptyPromptData],
  immutablePrompts: [emptyPromptData],
};

const promptsSource$ = prompts$.pipe(toSource("prompts$"));

export const promptStore = adapt(
  ["prompts", emptyPromptStore, promptAdapter],
  promptsSource$
);
