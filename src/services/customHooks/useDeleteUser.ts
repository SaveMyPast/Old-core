import { useState } from 'react';

import { getAuth, deleteUser } from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase';

export const useDeleteUser = () => {
	const auth = getAuth();
	const user = auth.currentUser;
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState(false);

	const deleteCurrentUser = async () => {
		if (!user) {
			setError(new Error('No user found'));
		} else {
			await deleteDoc(doc(firestore, 'users', user.uid))
				.catch(error => {
					setError(error);
				})
				.finally(() => {});
			await deleteUser(user)
				.then(() => {
					setLoading(true);
				})
				.catch(error => {
					setLoading(false);
					setError(error);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	return [deleteCurrentUser, error, loading] as const;
};

export default useDeleteUser;
