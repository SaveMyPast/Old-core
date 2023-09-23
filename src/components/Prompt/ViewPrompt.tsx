import * as React from 'react';
import { CircularProgress, Container, Paper, Typography } from '@mui/material';
import { useStore } from '@state-adapt/react';
import { promptStore } from '../../services/stores/promptStore';
import { analytics } from '../../services/firebase';
import { logEvent } from 'firebase/analytics';

const ViewPrompt = () => {
	const store = useStore(promptStore);

	if (store.activePrompt) {
		return (
			<>
				<Paper elevation={0}>
					<Container sx={{ padding: '12px' }}>
						<Typography variant="h6" textAlign={'left'}>
							{store.activePrompt.prompt}
						</Typography>
					</Container>
				</Paper>
			</>
		);
	}

	return (
		<>
			<Container>
				<CircularProgress />;
			</Container>
		</>
	);
};

export default ViewPrompt;
