import { useState } from "react";
import { PromptData } from "../interfaces";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const useSubmitPromptResponse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitPromptResponse = async (promptData: PromptData) => {
    setLoading(true);
    try {
      await setDoc(
        doc(firestore, "users", "userResponses", promptData.id),
        promptData,
        { merge: true }
      );
      setSuccess(true);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return [submitPromptResponse, success, error, loading] as const;
};

export default useSubmitPromptResponse;
