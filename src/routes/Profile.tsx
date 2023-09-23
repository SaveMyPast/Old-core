import * as React from 'react';
import UserListItem from '../components/Profile/UserListItem';
import { CircularProgress, Container } from '@mui/material';
import useGetUserInformation from '../services/customHooks/useGetUserInformation';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../services/firebase';

const Profile = () => {
	const [getUserInformation, userInformation, error] = useGetUserInformation();

	React.useEffect(() => {
		getUserInformation();
		logEvent(analytics, 'view', { page: 'profile' });
	}, []);

	if (error) {
		return <>{error}</>;
	}

	if (userInformation?.fullName)
	{if (userInformation?.birthdate) {
		return (
			<>
				<Container>
					<UserListItem
						name={userInformation?.fullName}
						birthdate={userInformation?.birthdate}
					/>
				</Container>
			</>
		);
	}}

	return (
		<>
			<CircularProgress />
		</>
	);
};

export default Profile;
