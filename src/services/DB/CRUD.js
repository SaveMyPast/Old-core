import { auth, db } from "./firebase.js";
import {
  userRespondedPromptStore,
  promptStore,
} from "../../stores/promptStore.js";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { userInformationStore } from "../../stores/loginStore.js";

// Create
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

export const adminAddNewPrompt = async (promptData) => {
  await setDoc(doc(db, "prompts"), {
    promptData,
  }).catch((err) => {
    console.error(err);
  });
};

export const addPromptResponse = async (promptData) => {
  await addDoc(
    collection(db, "users", auth.currentUser.uid, "promptResponses"),
    {
      promptData,
    }
  )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err.code);
    });
  userRespondedPromptStore.update((data) => data.push(promptData));
};

// Read
export const getAllPrompts = async () => {
  let allPrompts = [];

  const querySnapshot = await getDocs(collection(db, "prompts")).catch(
    (error) => {
      console.error(error);
    }
  );

  querySnapshot.forEach((doc) => {
    allPrompts.push(doc.data());
  });

  promptStore.set(allPrompts);
};

export const getUserAccountInformation = async () => {
  const docSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));

  if (docSnapshot.exists()) {
    userInformationStore.set(docSnapshot.data());
  } else {
    console.log("No such document!");
  }
};

export const getUserRespondedPrompts = async () => {
  let allUserResponses = [];

  const querySnapshot = await getDocs(
    collection(db, "users", auth.currentUser.uid, "promptResponses")
  ).catch((err) => {
    console.error(err);
  });

  querySnapshot.forEach((doc) => {
    allUserResponses.push(doc.data());
  });

  userRespondedPromptStore.set(allUserResponses);
};

// Update

export const updateUserInformation = async (userInformation) => {
  await setDoc(doc(db, "users", auth.currentUser.uid), userInformation, {
    merge: true,
  }).catch((err) => console.error(err));
};

export const updatePrompt = async (promptData) => {
  await setDoc(doc(db, "prompts"), promptData, {
    merge: true,
  }).catch((err) => console.error(err));
};

// Delete

export const deletePromptResponse = async (promptData) => {
  await deleteDoc(
    doc(db, "users", auth.currentUser.uid, "promptResponses", promptData)
  ).catch((err) => console.error(err));
};

export const deleteCurrentUserAccount = async () => {
  await deleteDoc(doc(db, "users", auth.currentUser.uid)).catch((err) =>
    console.error(err)
  );
};
