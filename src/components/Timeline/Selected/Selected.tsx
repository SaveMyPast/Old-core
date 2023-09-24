import * as React from 'react';

import { userResponseStore } from '../../../services/stores/userResponseStore';
import { useStore } from '@state-adapt/react';
import { Divider, Stack, Typography, Chip } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationIcon from '@mui/icons-material/LocationOn';
import { Bookmarks } from '@mui/icons-material';

export const Selected = () => {
	const userResponses = useStore(userResponseStore);

	if (!userResponses.isSelected) {
		return (
			<>
				<Typography variant="h5">Select a prompt to view.</Typography>
			</>
		);
	}

	return (
		<>
			<Stack spacing={2}>
				<Typography variant="h5">
					{userResponses.selectedResponse?.prompt}
				</Typography>

				<Stack direction="row" alignItems={'center'} spacing={2}>
					<Stack direction={'row'} spacing={1} alignItems={'center'}>
						<DateRangeIcon />
						<Typography variant="caption">
							{userResponses.selectedResponse?.year}
						</Typography>
						<Typography variant="caption">
              Age {userResponses.selectedResponse?.age}
						</Typography>
					</Stack>
					<Divider orientation="vertical" flexItem />
					<Stack direction={'row'} spacing={1} alignItems={'center'}>
						<LocationIcon />
						<Typography variant="caption">
							{userResponses.selectedResponse?.location}
						</Typography>
					</Stack>
					<Divider orientation="vertical" flexItem />
					<Stack direction={'row'} spacing={1}>
						<Bookmarks />
						{userResponses.selectedResponse?.tags.map(tag => (
							<Chip variant="outlined" key={tag} label={tag} size="small" />
						))}
					</Stack>
				</Stack>

				<Typography variant="body1">
					{userResponses.selectedResponse?.userResponse}
				</Typography>
			</Stack>
		</>
	);
};

export default Selected;
