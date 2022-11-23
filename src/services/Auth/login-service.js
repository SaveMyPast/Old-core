import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../DB/firebase.js";
import { userAuth } from "../../stores/loginStore";
import {
  addUser,
  getUserAccountInformation,
  getUserRespondedPrompts,
} from "../DB/CRUD.js";
import { navigate } from "svelte-routing";

export const loginWithUsernameAndPassword = (email, password) => {
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
    });
  navigate("/", { replace: true });
};

export const signUpNewUser = (signUpObject) => {
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
      }
    });
  navigate("/", { replace: true });
};

export const loginWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      userAuth.set(result.user);
      getUserAccountInformation();
      getUserRespondedPrompts();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(`${errorCode}: ${errorMessage}`);
    });
  navigate("/", { replace: true });
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      userAuth.set(null);
    })
    .catch((error) => {
      console.error(error);
    });
  navigate("/", { replace: true });
};

// export const updateProfile => {
//   updateProfile(auth.currentUser, {
//   displayName: "",
// }).then(() => {
//   // Profile updated!
//   // ...
// }).catch((error) => {
//   // An error occurred
//   // ...
// });
// }
