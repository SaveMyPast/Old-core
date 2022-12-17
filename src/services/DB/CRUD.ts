import { analytics, auth, db } from "./firebase.js";
import { userRespondedPromptStore, promptStore } from "../../stores/promptStore.js";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { logEvent } from "firebase/analytics";

// Create
export const addUser = async signUpObject => {
  await setDoc(doc(db, "users", auth.currentUser.uid), {
    email: auth.currentUser.email,
    name: signUpObject.fullName,
    birthdate: signUpObject.birthdate,
    isAdmin: false,
  })
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.error(error);
    });
};

export const adminAddNewPrompt = async promptData => {
  await addDoc(collection(db, "prompts"), {
    ...promptData,
  }).catch(err => {
    console.error(err);
  });
};

export const addPromptResponse = async promptData => {
  await addDoc(collection(db, "users", auth.currentUser.uid, "promptResponses"), {
    promptData,
  }).catch(err => {
    console.error(err.code);
  });
};

// Read
export const getAllPrompts = async () => {
  onSnapshot(collection(db, "prompts"), querySnapshot => {
    let allPrompts = [];
    console.log("All Prompts: ", querySnapshot.docs);
    querySnapshot.docs.forEach(doc => {
      const docObject = { id: doc.id, ...doc.data() };
      allPrompts.push(docObject);
    });
    promptStore.set(allPrompts);
  });
};

export const getUserRespondedPrompts = async () => {
  onSnapshot(collection(db, "users", auth.currentUser.uid, "promptResponses"), querySnapshot => {
    let userResponses = [];
    console.log("User Responses: ", querySnapshot.docs);
    querySnapshot.docs.forEach(doc => {
      const docObject = { id: doc.id, ...doc.data() };
      userResponses.push(docObject);
    });
    userRespondedPromptStore.set(userResponses);
  });
};

// Update

export const updateUserInformation = async userInformation => {
  await setDoc(doc(db, "users", auth.currentUser.uid), userInformation, {
    merge: true,
  }).catch(err => console.error(err));
};

export const updatePrompt = async ({ id, promptData }) => {
  return await updateDoc(doc(db, "prompts", id), promptData).catch(err => console.error(err));
};

// Delete

export const deleteCurrentUserAccount = async () => {
  await deleteDoc(doc(db, "users", auth.currentUser.uid));
};
