import { AddPromptData } from "../interfaces/interfaces";
import { auth } from "../firebase";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const useAdminAddPrompt = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const adminAddPrompt = async (promptData: AddPromptData) => {
    setLoading(true);

    try {
      if (!auth.currentUser) {
        throw new Error("User not logged in");
      }
      await setDoc(doc(firestore, "prompts"), promptData).then(() => {
        setSuccess(true);
        setLoading(false);
      });
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return [adminAddPrompt, success, error, loading] as const;
};

export default useAdminAddPrompt;
