import { createAdapter } from "@state-adapt/core";
import { PromptFormStoreInterface } from "../interfaces/PromptFormStoreInterface";

const resetField = (
  state: PromptFormStoreInterface,
  field: string
): PromptFormStoreInterface => {
  switch (field) {
    case "userResponse":
      return {
        ...state,
        userResponse: {
          response: "",
          responseValid: false,
          responseError: "",
        },
      };
    case "tags":
      return {
        ...state,
        tags: {
          tags: [],
          tagsValid: false,
          tagsError: "",
        },
      };
    case "year":
      return {
        ...state,
        year: {
          year: "",
          yearValid: false,
          yearError: "",
        },
      };
    case "age":
      return {
        ...state,
        age: {
          age: 0,
          ageValid: false,
          ageError: "",
        },
      };
    case "location":
      return {
        ...state,
        location: {
          location: "",
          locationValid: false,
          locationError: "",
        },
      };
    case "promptId":
      return {
        ...state,
        promptId: {
          promptId: "",
          promptIdValid: false,
          promptIdError:
            "There has been an error with the server. [Promptid not found]",
        },
      };
    case "prompt":
      return {
        ...state,
        prompt: {
          prompt: "",
          promptValid: false,
          promptError:
            "There has been an error with the server. [Prompt not found]",
        },
      };
    default:
      return state;
  }
};

const checkValidity = (
  state: PromptFormStoreInterface
): PromptFormStoreInterface => {
  const { userResponse, tags, year, age, location, promptId, prompt } = state;
  let formValid = false;

  if (
    userResponse.responseValid &&
    tags.tagsValid &&
    year.yearValid &&
    age.ageValid &&
    location.locationValid &&
    promptId.promptIdValid &&
    prompt.promptValid
  ) {
    formValid = true;
  }

  return formValid
    ? {
        ...state,
        formValid: true,
      }
    : {
        ...state,
        formValid: false,
      };
};

const syncPrompt = (
  state: PromptFormStoreInterface,
  payload: { prompt: string; id: string }
) => {
  const { prompt, id } = payload;
  return {
    ...state,
    prompt: {
      prompt: prompt,
      promptValid: true,
      promptError: "",
    },
    promptId: {
      promptId: id,
      promptIdValid: true,
      promptIdError: "",
    },
  };
};

const promptFormAdapter = createAdapter<PromptFormStoreInterface>()({
  resetField,
  checkValidity,
  syncPrompt,
  selectors: {
    validity: (state: PromptFormStoreInterface) => {
      return state.formValid;
    },
  },
});

export default promptFormAdapter;
