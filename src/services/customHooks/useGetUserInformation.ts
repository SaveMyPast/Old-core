import { UserInformation } from "./../interfaces";
import { useState } from "react";
import { auth, firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";

const useGetCurrentUserInformation = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userInformation, setUserInformation] =
    useState<UserInformation | null>(null);

  const [userAuth] = useState<User | null>(auth.currentUser);

  const getUserInformation = async () => {
    if (userAuth) {
      await getDoc(doc(firestore, "users", userAuth.uid))
        .then((doc) => {
          if (doc.exists()) {
            setLoading(false);
            setUserInformation({ ...(doc.data() as UserInformation) });
          } else {
            throw new Error("No user found");
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
          setError(error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("User not logged in");
    }
  };

  return [getUserInformation, userInformation, error, loading] as const;
};

export default useGetCurrentUserInformation;
