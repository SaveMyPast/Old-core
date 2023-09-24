import { firestore } from './../firebase';
import { useState } from 'react';
import { RegistrationCredential } from './../interfaces/interfaces';
import { User, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const useRegisterNewUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const setUserData = async (
        user: User | null,
        registrationInfo: RegistrationCredential
    ) => {
        if (!user) {
            setError('No user found when creating entry');
            return;
        } else {
            await setDoc(doc(firestore, 'users', user.uid), {
                fullName: registrationInfo.fullName,
                email: user.email,
                birthdate: registrationInfo.birthdate,
                isAdmin: false,
            }).catch(err => {
                setError(err);
            });
        }
    };

    const registerNewUser = async (
        registrationCredential: RegistrationCredential
    ) => {
        if (!user) {
            setLoading(true);
            await createUserWithEmailAndPassword(
                auth,
                registrationCredential.email,
                registrationCredential.password
            )
                .then(userCredential => {
                    setUser(userCredential.user);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
            await setUserData(auth.currentUser, registrationCredential).catch(
                err => {
                    setError(err.message);
                    setLoading(false);
                }
            );
        } else {
            setError('User already logged in');
            setLoading(false);
        }
    };

    return [registerNewUser, error, loading] as const;
};

export default useRegisterNewUser;
