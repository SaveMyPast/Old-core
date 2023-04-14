import { PromptData } from "./../interfaces/interfaces";
import { auth } from "./../firebase";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const useSubmitPromptResponse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submitPromptResponse = async (promptData: PromptData) => {
    setLoading(true);

    if (!promptData.id) {
      setError("No prompt id provided");
      setLoading(false);
      return;
    }

    try {
      if (!auth.currentUser) {
        throw new Error("User not logged in");
      }
      await setDoc(
        doc(
          firestore,
          "users",
          auth.currentUser.uid,
          "userResponses",
          promptData.id
        ),
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
