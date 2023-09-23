import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	Typography
} from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeCards = () => {
	const Navigator = useNavigate();
	const cards = [
		{ title: 'Example Prompt', description: 'Example Description' },
		{ title: 'Example Prompt', description: 'Example Description' },
		{ title: 'Example Prompt', description: 'Example Description' },
		{ title: 'Example Prompt', description: 'Example Description' },
		{ title: 'Example Prompt', description: 'Example Description' },
		{ title: 'Example Prompt', description: 'Example Description' }
	];

	return (
		<>
			<Box sx={{ padding: '36px', backgroundColor: 'lightgrey' }}>
				<Grid
					item
					container
					flexDirection={'row'}
					spacing={3}
					justifyContent={'center'}
				>
					{cards.map((card, index) => (
						<Grid item xs={12} md={4} key={index}>
							<Card sx={{ height: '100%' }}>
								<CardContent>
									<Typography variant="h6" textAlign="left">
										{card.title}
									</Typography>
									<Typography variant="body1" textAlign="left">
										{card.description}
									</Typography>
								</CardContent>
								<CardActions>
									<Button
										variant={'text'}
										onClick={() => {
											Navigator('/register');
										}}
									>
                    Answer me
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
};

export default WelcomeCards;
