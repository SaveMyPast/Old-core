import * as React from 'react';
import DeleteUser from '../components/settings/DeleteUser';
import { Container, Typography } from '@mui/material';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../services/firebase';

const Settings = () => {
	React.useEffect(() => {
		logEvent(analytics, 'view', { page: 'settings' });
	}, []);

	return (
		<>
			<Container>
				<Typography variant="h2">User Settings</Typography>
				<DeleteUser />
			</Container>
		</>
	);
};

export default Settings;
