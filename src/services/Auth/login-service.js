import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../DB/firebase.js";
import { userAuth } from "../../stores/loginStore";
import { addUser } from "../DB/CRUD.js";

export const loginWithUsernameAndPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      userAuth.set(userCredential.user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/user-not-found") {
      } else {
        console.error(`${errorCode}: ${errorMessage}`);
      }
    });
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
    })
    .catch((error) => {
      if (error.message == "auth/email-already-in-use") {
      } else {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(`${errorCode}: ${errorMessage}`);
      }
    });
};

export const loginWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      userAuth.set(result.user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(`${errorCode}: ${errorMessage}`);
    });
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      userAuth.set(null);
    })
    .catch((error) => {
      console.error(error);
    });
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
