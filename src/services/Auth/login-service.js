import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../DB/firebase.js";
import { user } from "../../stores/loginStore";

export const loginWithUsernameAndPassword = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      user.set(userCredential.user);
    })
    .catch((error) => {
      if (error.message == "auth/email-already-in-use") {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            user.set(userCredential.user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.error(`${errorCode}: ${errorMessage}`);
          });
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
      user.set(result.user);
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
      user.set(null);
    })
    .catch((error) => {
      console.error(error);
    });
};
