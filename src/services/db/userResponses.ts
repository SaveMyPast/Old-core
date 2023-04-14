import { SelectablePromptData } from "./../interfaces/interfaces";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";
import { Observable } from "rxjs";
import { PromptData } from "./../interfaces/interfaces";
import { auth } from "../firebase";

const userResponses$: Observable<SelectablePromptData[]> = new Observable(
  (subscriber) => {
    const unsubscribe = onSnapshot(
      collection(firestore, `users/${auth.currentUser?.uid}/userResponses`),
      (snapshot) => {
        const responses: SelectablePromptData[] = snapshot.docs.map((doc) => {
          return { selected: false, ...(doc.data() as PromptData) };
        });
        subscriber.next(responses);
      }
    );
    return unsubscribe;
  }
);

export default userResponses$;
