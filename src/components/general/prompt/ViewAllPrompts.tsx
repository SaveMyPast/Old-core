import { CircularProgress, List } from '@mui/material';
import * as React from 'react';
import { useStore } from '@state-adapt/react';

import { promptStore } from '../../../services/stores/promptStore';
import PromptListItem from './PromptListItem';

export const ViewAllPrompts = () => {
	const selectablePrompts = useStore(promptStore);

	if (!selectablePrompts.state) {
		return (
			<>
				<CircularProgress />
			</>
		);
	}

	return (
		<>
			<List>
				{selectablePrompts.allPrompts.map((prompt) => (
					<PromptListItem key={prompt.id} prompt={prompt} />
				))}
			</List>
		</>
	);
};

export default ViewAllPrompts;
