/**
 * @interface RegistrationCredential
 *
 *  @param {string} fullName - user full name `John Smith`
 *  @param {string} email - user email `misc@email.com`
 *  @param {string} birthdate - user birthdate `YYYY-MM-DD`
 *  @param {string} password - user password `password`
 */
export interface RegistrationCredential {
  fullName: string;
  email: string;
  birthdate: string;
  password: string;
}

/**
 * @interface LoginCredential
 *
 *  @param {string} email - user email `misc@email.com`
 *  @param {string} password - user password `password`
 */
export interface LoginCredential {
  email: string;
  password: string;
}

/**
 * @interface PromptData
 *
 * @param {string} id - prompt id `firebase.firestore.doc.id`
 * @param {number} age - prompt age `0-100`
 * @param {string} prompt - prompt text `What is your favorite color?`
 * @param {string} userResponse - user response to prompt `Blue`
 * @param {string} year - year prompt was created `YYYY`
 * @param {string} location - prompt location `United States`
 * @param {string[]} tags - prompt category `Family`
 *
 */
export interface PromptData {
  id: string;
  age: number;
  prompt: string;
  userResponse: string;
  year: string;
  location: string;
  tags: string[];
}

/**
 * @interface AddPromptData
 * @description - used to add prompt to firebase
 * @param {number} age - prompt age `0-100`
 * @param {string} prompt - prompt text `What is your favorite color?`
 * @param {string} userResponse - user response to prompt should be empty `""`
 * @param {string} year - year prompt was created `YYYY`
 * @param {string} location - prompt location `United States`
 * @param {string[]} tags - prompt category `Family`
 **/
export interface AddPromptData {
  age: number;
  prompt: string;
  userResponse: string;
  year: string;
  location: string;
  tags: string[];
}

/**
 * @interface UserInformation
 *
 * @param {string} id - user id `firebase.auth.currentUser.uid`
 * @param {string} fullName - user full name `John Smith`
 * @param {string} email - user email `misc@email.com`
 * @param {string} birthdate - user birthdate `YYYY-MM-DD`
 * @param {boolean} isAdmin - user admin status `true` or `false`
 *
 */

export interface UserInformation {
  id: string;
  fullName: string;
  email: string;
  birthdate: string;
  isAdmin: boolean;
  password?: string;
}

/**
 * @interface FirebasePromptData
 *
 * @param {string} id - prompt id `firebase.firestore.doc.id`
 * @param {number} age - prompt age `0-100`
 * @param {string} prompt - prompt text `What is your favorite color?`
 * @param {string} userResponse - user response to prompt `Blue`
 * @param {string} year - year prompt was created `YYYY`
 * @param {string} location - prompt location `United States`
 * @param {string[]} tags - prompt category `Family`
 *
 */
export interface FirebasePromptData {
  age: number;
  prompt: string;
  userResponse: string;
  year: string;
  location: string;
  tags: string[];
}

/**
 * @interface PromptSuggestedTags
 * @description Suggested tags for prompts
 * @param {string} love - love tag `love`
 * @param {string} school - school tag `school`
 * @param {string} family - family tag `family`
 * @param {string} friends - friends tag `friends`
 * @param {string} work - work tag `work`
 * @param {string} travel - travel tag `travel`
 * @param {string} hobbies - hobbies tag `hobbies`
 * @param {string} religion - religion tag `religion`
 * @param {string} health - health tag `health`
 * @param {string} regret - regret tag `regret`
 * @param {string} achievement - achievement tag `achievement`
 * @param {string} adversity - adversity tag `adversity`
 *
 **/
export interface PromptSuggestedTags {
  love: string;
  school: string;
  family: string;
  friends: string;
  work: string;
  travel: string;
  hobbies: string;
  religion: string;
  health: string;
  regret: string;
  achievement: string;
  adversity: string;
}

/**
 * @interface ModifyPromptPayload
 * @description Payload for modifying prompt
 * @param {PromptData} current prompt - prompt data
 * @param {PromptData} new prompt - prompt data
 *
 **/

export interface ModifyPromptPayload {
  current: PromptData;
  new: PromptData;
}

/**
 * @interface SelectablePromptData
 * @description Prompt data for selectable prompts
 * @param {string} id - prompt id `firebase.firestore.doc.id`
 * @param {number} age - prompt age `0-100`
 * @param {string} prompt - prompt text `What is your favorite color?`
 * @param {string} userResponse - user response to prompt `Blue`
 * @param {string} year - year prompt was created `YYYY`
 * @param {string} location - prompt location `United States`
 * @param {string[]} tags - prompt category `Family`
 * @param {boolean} selected - prompt selected status `true` or `false`
 **/

export interface SelectablePromptData {
  id: string;
  age: number;
  prompt: string;
  userResponse: string;
  year: string;
  location: string;
  tags: string[];
  selected: boolean;
}
