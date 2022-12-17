import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  deleteUser,
} from "firebase/auth";
import { analytics, auth } from "../DB/firebase.js";
import { userAuthFailStore } from "../../stores/loginStore";
import {
  addUser,
  deleteCurrentUserAccount,
  getAllPrompts,
  getUserRespondedPrompts,
} from "../DB/CRUD.js";
import { navigate } from "svelte-routing";
import { logEvent } from "firebase/analytics";

// Auth Listener, will update userAuth store if user is logged in or out.
auth.onAuthStateChanged(user => {
  if (user) {
    getUserRespondedPrompts();
    getAllPrompts();
  } else {
    console.log("User is not logged in.");
  }
});

export const loginWithUsernameAndPassword = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log("logged in");
      logEvent(analytics, "login_successful");
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      logEvent(analytics, "login_failed", {
        error_code: errorCode,
      });
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

export const signUpNewUser = (signUpObject: { email: string; password: string }) => {
  createUserWithEmailAndPassword(auth, signUpObject.email, signUpObject.password)
    .then(userCredential => {
      logEvent(analytics, "sign_up_successful");
      addUser(signUpObject);
      console.log("signed up");
    })
    .catch(error => {
      logEvent(analytics, "sign_up_failed", {
        error_code: error.code,
      });
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
      logEvent(analytics, "logout_successful");
    })
    .catch(error => {
      logEvent(analytics, "logout_failed", {
        error_code: error.code,
      });
      console.error(error);
    });
  navigate("/", { replace: true });
};

export const deleteUserAccount = () => {
  deleteCurrentUserAccount()
    .then(() => {
      logEvent(analytics, "delete_account_successful");
      deleteUser(auth.currentUser)
        .catch(error => {
          console.error(error);
          logEvent(analytics, "delete_account_failed", {
            error_code: error.code,
          });
        });
    })
    .catch(error => {
      logEvent(analytics, "delete_account_failed", {
        error_code: error.code,
        user: auth.currentUser.email,
      });
      console.error(error);
    });
  navigate("/", { replace: true });
};

export const attemptForgotPassword = (email: string) => {
  logEvent(analytics, "forgot_password_email_attempt");
  return sendPasswordResetEmail(auth, email);
};
