import { PromptStoreInterface } from "./../interfaces/PromptStoreInterface";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";
import { Observable } from "rxjs";
import { PromptData, FirebasePromptData } from "../interfaces/interfaces";

const prompts$: Observable<PromptStoreInterface> = new Observable(
  (subscriber) => {
    const unsubscribe = onSnapshot(
      collection(firestore, "prompts"),
      (snapshot) => {
        const prompts: PromptData[] = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...(doc.data() as FirebasePromptData),
            activePrompt: false,
            viewedPrompt: false,
          };
        });

        subscriber.next({ prompts: prompts, immutablePrompts: prompts });
      }
    );
    return unsubscribe;
  }
);

export default prompts$;
