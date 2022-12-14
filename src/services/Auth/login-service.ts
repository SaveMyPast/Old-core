import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  deleteUser,
} from "firebase/auth";
import { auth } from "../DB/firebase.js";
import {
  userAuth,
  userAuthFailStore,
  userInformationStore,
} from "../../stores/loginStore";
import {
  addUser,
  deleteCurrentUserAccount,
  getUserAccountInformation,
  getUserRespondedPrompts,
} from "../DB/CRUD.js";
import { navigate } from "svelte-routing";

export const loginWithUsernameAndPassword = (
  email: string,
  password: string
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      userAuth.set(userCredential.user);
      getUserAccountInformation();
      getUserRespondedPrompts();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/user-not-found") {
      } else {
        console.error(`${errorCode}: ${errorMessage}`);
      }
      userAuthFailStore.set(`Login Failed: ${errorCode}`);
    });
  if (userAuthFailStore == null) {
    navigate("/", { replace: true });
  }
};

export const signUpNewUser = (signUpObject: {
  email: string;
  password: string;
}) => {
  createUserWithEmailAndPassword(
    auth,
    signUpObject.email,
    signUpObject.password
  )
    .then((userCredential) => {
      userAuth.set(userCredential.user);
      addUser(signUpObject);
      getUserAccountInformation();
    })
    .catch((error) => {
      if (error.message == "auth/email-already-in-use") {
      } else {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(`${errorCode}: ${errorMessage}`);
        userAuthFailStore.set(`${errorCode}: ${errorMessage}`);
      }
    });
  if (userAuthFailStore == null) {
    navigate("/", { replace: true });
  }
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      userAuth.set(null);
      userInformationStore.set({
        isAdmin: false,
        birthdate: null,
        email: null,
        name: null,
        id: null,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  navigate("/", { replace: true });
};

export const deleteUserAccount = () => {
  deleteCurrentUserAccount()
    .then(() => {
      deleteUser(auth.currentUser)
        .then(() => {
          userAuth.set(null);
          userInformationStore.set({
            isAdmin: false,
            birthdate: null,
            email: null,
            name: null,
            id: null,
          });
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => {
      console.error(error);
    });
  navigate("/", { replace: true });
};

export const attemptForgotPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};
