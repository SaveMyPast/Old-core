import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";
import { Observable } from "rxjs";
import { PromptData, FirebasePromptData } from "../interfaces";

const prompts$: Observable<PromptData[]> = new Observable((subscriber) => {
  const unsubscribe = onSnapshot(
    collection(firestore, "prompts"),
    (snapshot) => {
      const prompts: PromptData[] = snapshot.docs.map((doc) => {
        return { id: doc.id, ...(doc.data() as FirebasePromptData) };
      });
      subscriber.next(prompts);
    }
  );
  return unsubscribe;
});

export default prompts$;
