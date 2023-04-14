import { PromptData } from "./interfaces";

export interface PromptStoreInterface {
  prompts: PromptData[];
  immutablePrompts: PromptData[];
}

export default PromptStoreInterface;
