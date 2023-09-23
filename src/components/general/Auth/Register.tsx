import {
	Button,
	CircularProgress,
	Grid,
	Link,
	TextField,
	Typography
} from '@mui/material';
import { Container } from '@mui/system';
import * as React from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../services/firebase';
import Logout from './Logout';
import { RegistrationCredential } from '../../../services/interfaces/interfaces';
import { useRegisterNewUser } from '../../../services/customHooks/useRegisterNewUser';
import { analytics } from '../../../services/firebase';
import { logEvent } from 'firebase/analytics';

const Register = () => {
	const [user, loading] = useAuthState(auth);
	const [registerNewUser, userCreated, error, creatingUser] =
    useRegisterNewUser();
	const [registerObject, setRegisterObject] = useState<RegistrationCredential>({
		fullName: '',
		email: '',
		birthdate: '',
		password: ''
	});

	const handleSubmit = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		logEvent(analytics, 'register_attempt', {
			email: registerObject.email,
			birthdate: registerObject.birthdate
		});
		registerNewUser(registerObject);
	};

	if (loading || creatingUser) {
		return (
			<>
				<Container maxWidth={'sm'} sx={{ textAlign: 'center' }}>
					<CircularProgress />
				</Container>
			</>
		);
	}

	if (user) {
		return (
			<>
				<Container
					maxWidth={'sm'}
					sx={{ marginTop: '5%', textAlign: 'center' }}
				>
					<Typography>You are currently signed in as</Typography>
					<Typography>{user.email}</Typography>
					<Logout />
				</Container>
			</>
		);
	}

	if (userCreated) {
		return (
			<>
				<Container
					maxWidth={'sm'}
					sx={{ marginTop: '5%', textAlign: 'center' }}
				>
					<Typography>You are currently signed in as</Typography>
					<Typography>{userCreated.email}</Typography>
					<Logout />
				</Container>
			</>
		);
	}

	return (
		<>
			<Container maxWidth={'sm'}>
				<form noValidate autoComplete="off" onSubmit={handleSubmit}>
					<Grid
						container
						spacing={2}
						flexDirection={'column'}
						alignItems={'stretch'}
						justifyContent={'center'}
					>
						<Grid item>
							<Typography textAlign={'center'} variant="h4">
                Register
							</Typography>
						</Grid>
						<Grid item>
							<TextField
								id="fullName"
								label="Full Name"
								type={'text'}
								autoComplete="full name"
								required
								error={error ? true : false}
								helperText={error ? error : ''}
								fullWidth
								onChange={event =>
									setRegisterObject({
										...registerObject,
										fullName: event.target.value
									})
								}
							/>
						</Grid>
						<Grid item>
							<TextField
								id="email"
								label="Email"
								type={'email'}
								autoComplete="email"
								required
								error={error ? true : false}
								helperText={error ? error : ''}
								fullWidth
								onChange={event =>
									setRegisterObject({
										...registerObject,
										email: event.target.value
									})
								}
							/>
						</Grid>
						<Grid item>
							<TextField
								id="birthdate"
								label="Birthdate"
								type={'date'}
								autoComplete="birthdate"
								required
								error={error ? true : false}
								helperText={error ? error : ''}
								InputLabelProps={{ shrink: true }}
								fullWidth
								onChange={event =>
									setRegisterObject({
										...registerObject,
										birthdate: event.target.value
									})
								}
							/>
						</Grid>
						<Grid item>
							<TextField
								id="password"
								label="Password"
								autoComplete="current-password"
								required
								fullWidth
								error={error ? true : false}
								helperText={error ? error : ''}
								type={'password'}
								onChange={event =>
									setRegisterObject({
										...registerObject,
										password: event.target.value
									})
								}
							/>
						</Grid>
						<Grid item container alignItems={'center'} spacing={3}>
							<Grid item>
								<Typography>Already have an account?</Typography>
							</Grid>
							<Grid item sx={{ flex: 1 }}>
								<Link href={'/Login'} sx={{ textDecoration: 'none' }}>
									<Typography variant="button">Login</Typography>
								</Link>
							</Grid>
							<Grid item>
								<Button type={'submit'} variant={'contained'}>
                  Create Account
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</form>
			</Container>
		</>
	);
};

export default Register;
