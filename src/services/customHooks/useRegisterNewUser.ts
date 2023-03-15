import { firestore } from "./../firebase";
import { useState } from "react";
import { RegistrationCredential } from "./../interfaces";
import { User, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const useRegisterNewUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const setUserData = async (
    user: User | null,
    registrationInfo: RegistrationCredential
  ) => {
    if (!user) {
      console.error("No user found when creating DB entry");
      return;
    } else {
      await setDoc(doc(firestore, "users", user.uid), {
        fullName: registrationInfo.fullName,
        email: user.email,
        birthdate: registrationInfo.birthdate,
        isAdmin: false,
      }).catch((err) => {
        console.error(err);
      });
    }
  };

  const registerNewUser = async (
    registrationCredential: RegistrationCredential
  ) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        registrationCredential.email,
        registrationCredential.password
      ).then((userCredential) => {
        setUser(userCredential.user);
        setLoading(false);
      });
      await setUserData(auth.currentUser, registrationCredential);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return [registerNewUser, user, error, loading] as const;
};

export default useRegisterNewUser;
