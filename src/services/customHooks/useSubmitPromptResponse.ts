import { PromptData } from './../interfaces/interfaces';
import { auth } from './../firebase';
import { useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

const useSubmitPromptResponse = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const submitPromptResponse = async (promptData: PromptData) => {
		setLoading(true);

		if (!promptData.id) {
			setError('No prompt id provided');
			setLoading(false);
		}
		if (!auth.currentUser) {
			setError('User not logged in');
			setLoading(false);
		}

		if (auth.currentUser) {



			const answered = await getDoc(
				doc(
					firestore,
					'users',
					auth.currentUser.uid,
					'userResponses',
					promptData.id
				)
			);

			if (answered.exists()) {
				setSuccess(false);
				setLoading(false);
				setError('Prompt already answered');
			} else {
				await setDoc(
					doc(
						firestore,
						'users',
						auth.currentUser.uid,
						'userResponses',
						promptData.id
					),
					promptData,
					{ merge: false }
				);
				setSuccess(true);
				setLoading(false);
			}
		}
	};

	return [submitPromptResponse, success, error, loading] as const;
};

export default useSubmitPromptResponse;
