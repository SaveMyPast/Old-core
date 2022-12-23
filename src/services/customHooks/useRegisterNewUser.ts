import { firestore } from "./../firebase";
import { useState } from "react";
import { RegistrationCredential } from "./../interfaces";
import { User, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export const useRegisterNewUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
        const user = userCredential.user;
        setUser(user);
        setLoading(false);
        addDoc(collection(firestore, "users"), {
          fullName: registrationCredential.fullName,
          email: registrationCredential.email,
          birthdate: registrationCredential.birthdate,
          isAdmin: false,
        }).catch((err) => {
          console.error(err);
        });
      });
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return [registerNewUser, user, error, loading] as const;
};
