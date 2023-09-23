import { PromptData } from '../interfaces/interfaces';
import { auth } from '../firebase';
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

const useAdminEditPrompt = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const adminEditPrompt = async (promptData: PromptData) => {
		setLoading(true);

		if (!auth.currentUser) {
			throw new Error('User not logged in');
		}
		await setDoc(doc(firestore, promptData.id), promptData)
			.then(() => {
				setSuccess(true);
				setLoading(false);
			})
			.catch(err => {
				setError(err.message);
				setLoading(false);
			});
	};

	return [adminEditPrompt, success, error, loading] as const;
};

export default useAdminEditPrompt;
