import DateRangeIcon from '@mui/icons-material/DateRange';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useStore } from '@state-adapt/react';
import * as React from 'react';
import { promptFormStore } from '../PromptFormStore/PromptFormStore';
import { YearFormObject } from '../../../services/interfaces/PromptFormStoreInterface';

const YearField = () => {
	const form = useStore(promptFormStore);

	const handleChange = (input: string) => {
		const year = {
			year: input,
			yearValid: form.state.year.yearValid,
			yearError: form.state.year.yearError
		};

		promptFormStore.set({ ...form.state, year });
		validateYear();
	};

	const validateYear = () => {
		const year: YearFormObject = {
			year: form.state.year.year,
			yearValid: form.state.year.yearValid,
			yearError: form.state.year.yearError
		};

		const yearRegex = /^\d{4}$/;

		if (yearRegex.test(form.state.year.year)) {
			year.yearValid = true;
			year.yearError = '';
			promptFormStore.set({ ...form.state, year });
		} else {
			year.yearValid = false;

			if (form.state.year.year.length === 0) {
				year.yearError = 'Year is required';
			} else {
				year.yearError = 'Year must be in YYYY format';
			}
			promptFormStore.set({ ...form.state, year });
		}
	};

	return (
		<TextField
			className="w-48"
			variant="outlined"
			size="small"
			InputLabelProps={{ shrink: true }}
			label="Year"
			placeholder="YYYY"
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton>
							<DateRangeIcon />
						</IconButton>
					</InputAdornment>
				)
			}}
			error={!form.state.year.yearValid}
			helperText={form.state.year.yearError}
			onChange={e => handleChange(e.target.value)}
			value={form.state.year.year}
		/>
	);
};

export default YearField;
