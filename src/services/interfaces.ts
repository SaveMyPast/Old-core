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
 * @param {number} year - year prompt was created `YYYY`
 * @param {boolean} goodMemory - prompt good memory `true` or `false`
 * @param {string} location - prompt location `United States`
 *
 */
export interface PromptData {
  id: string;
  age: number;
  prompt: string;
  userResponse: string;
  year: number;
  goodMemory: boolean;
  location: string;
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
