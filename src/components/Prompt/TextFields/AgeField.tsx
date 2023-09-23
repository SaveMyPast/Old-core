import { TextField } from '@mui/material';
import { useStore } from '@state-adapt/react';
import * as React from 'react';
import { promptFormStore } from '../PromptFormStore/PromptFormStore';
import { AgeFormObject } from '../../../services/interfaces/PromptFormStoreInterface';

const AgeField = () => {
	const form = useStore(promptFormStore);

	const validateAge = () => {
		const age = {
			age: form.state.age.age,
			ageValid: form.state.age.ageValid,
			ageError: form.state.age.ageError
		};

		if (form.state.age.age > 0 && form.state.age.age < 120) {
			age.ageValid = true;
			age.ageError = '';
			promptFormStore.set({ ...form.state, age });
		} else {
			age.ageValid = false;

			if (form.state.age.age === 0) {
				age.ageError = 'Age is required';
			} else {
				age.ageError = 'Age must be between 0 and 120';
			}
			promptFormStore.set({ ...form.state, age });
		}
	};

	const handleChange = (input: number) => {
		const age: AgeFormObject = {
			age: input ? input : 0,
			ageValid: form.state.age.ageValid,
			ageError: form.state.age.ageError
		};

		promptFormStore.set({ ...form.state, age });
		validateAge();
	};

	return (
		<TextField
			className="w-48"
			variant="outlined"
			size="small"
			type={'number'}
			onChange={e => {
				handleChange(parseInt(e.target.value));
			}}
			InputLabelProps={{ shrink: true }}
			label="Your Age"
			placeholder="Your age at the time"
			error={!form.state.age.ageValid}
			helperText={form.state.age.ageError}
			value={form.state.age.age.toString().replace(/^0+/, '')}
		/>
	);
};

export default AgeField;
