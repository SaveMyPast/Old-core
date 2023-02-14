import { collection } from "firebase/firestore";
import { FirebasePromptData } from "../interfaces";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";

export const useGetAllPrompts = () => {
  let loading = true;
  const [promptsCollection, , error] = useCollection(
    collection(firestore, "prompts")
  );

  let prompts = promptsCollection?.docs.map((doc) => {
    loading = false;
    return {
      id: doc.id,
      ...(doc.data() as FirebasePromptData),
    };
  });

  return [prompts, error, loading] as const;
};
