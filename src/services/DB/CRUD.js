import { auth, db } from "./firebase.js";
import {
  userRespondedPromptStore,
  promptStore,
  singleRandomPromptStore,
} from "../../stores/promptStore.js";
// Create
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

// addUser to users collection.
export const addUser = async (signUpObject) => {
  await setDoc(doc(db, "users", auth.currentUser.uid), {
    email: auth.currentUser.email,
    name: signUpObject.fullName,
    birthdate: signUpObject.birthdate,
    isAdmin: false,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const addPromptResponse = (promptData) => {
  //
};

// Read
export const getAllPrompts = async () => {
  const querySnapshot = await getDocs(collection(db, "prompts"));
  let allPrompts = [];
  querySnapshot.forEach((doc) => {
    allPrompts.push(doc.data());
  });
  promptStore.set(allPrompts);
  singleRandomPromptStore.set(
    allPrompts[Math.floor(Math.random * allPrompts.length)]
  );
};

export const getUserAccountInformation = async () => {
  // await
};

export const getUserRespondedPrompts = async () => {
  //
};

// Update

export const updateUserInformation = async (userInformation) => {
  //
};

export const updatePrompt = async (promptData) => {
  //
};

// Delete

export const deletePromptResponse = async (promptData) => {
  //
};

export const deleteCurrentUserAccount = async () => {
  //
};
