import { adapt } from "../../state-adapt";
import { toSource } from "@state-adapt/rxjs";
import promptAdapter from "../adapters/promptAdapter";
import prompts$ from "../db/prompts";
import { PromptData } from "../interfaces";

const emptyPromptData: PromptData = {
  id: "",
  age: 0,
  prompt: "",
  tags: [],
  userResponse: "",
  year: "",
  location: "",
};

const promptsSource$ = prompts$.pipe(toSource("prompts$"));

export const promptStore = adapt(
  ["prompts", [emptyPromptData], promptAdapter],
  promptsSource$
);

export default promptStore;
