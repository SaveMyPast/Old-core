import { PromptStoreInterface } from './../interfaces/PromptStoreInterface';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Observable } from 'rxjs';
import { PromptData, FirebasePromptData } from '../interfaces/interfaces';
import { promptFormStore } from '../../components/Prompt/PromptFormStore/PromptFormStore';

const prompts$: Observable<PromptStoreInterface> = new Observable(
	subscriber => {
		const unsubscribe = onSnapshot(
			collection(firestore, 'prompts'),
			snapshot => {
				const prompts: PromptData[] = snapshot.docs.map((doc, index) => {
					if (index === 0) {
						const setFormPrompt = () => {
							promptFormStore.syncPrompt({
								prompt: doc.data().prompt,
								id: doc.id
							});
						};

						setFormPrompt();

						return {
							id: doc.id,
							...(doc.data() as FirebasePromptData),
							activePrompt: true,
							viewedPrompt: true
						};
					}

					return {
						id: doc.id,
						...(doc.data() as FirebasePromptData),
						activePrompt: false,
						viewedPrompt: false
					};
				});

				subscriber.next({ prompts, immutablePrompts: prompts });
			}
		);
		return unsubscribe;
	}
);

export default prompts$;
