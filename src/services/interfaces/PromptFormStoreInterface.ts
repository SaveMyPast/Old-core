export interface UserResponseFormObject {
  response: string;
  responseValid: boolean;
  responseError: string;
}

export interface TagsFormObject {
  tags: string[];
  tagsValid: boolean;
  tagsError: string;
}

export interface YearFormObject {
  year: string;
  yearValid: boolean;
  yearError: string;
}

export interface AgeFormObject {
  age: number;
  ageValid: boolean;
  ageError: string;
}

export interface LocationFormObject {
  location: string;
  locationValid: boolean;
  locationError: string;
}

export interface PromptIdFormObject {
  promptId: string;
  promptIdValid: boolean;
  promptIdError: string;
}

export interface PromptFormObject {
  prompt: string;
  promptValid: boolean;
  promptError: string;
}

/**
 * @description
 * The PromptFormStoreInterface is used to determine the validity of the user's response to the prompt.
 *
 * @property {UserResponseFormObject} userResponse - The user's response to the prompt.
 * @property {TagsFormObject} tags - The tags associated with the promptResponse.
 * @property {YearFormObject} year - The year submitted with the promptResponse.
 * @property {AgeFormObject} age - The age submitted with the promptResponse.
 * @property {LocationFormObject} location - The location submitted with the promptResponse.
 * @property {PromptIdFormObject} promptId - The promptId associated with the prompt.
 * @property {PromptFormObject} prompt - The prompt associated with the promptId.
 * @property {formValid} boolean  - The validity of the form.
 **/
export interface PromptFormStoreInterface {
  userResponse: UserResponseFormObject;
  tags: TagsFormObject;
  year: YearFormObject;
  age: AgeFormObject;
  location: LocationFormObject;
  promptId: PromptIdFormObject;
  prompt: PromptFormObject;
  formValid: boolean;
}
