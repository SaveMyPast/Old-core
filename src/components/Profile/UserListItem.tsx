import * as React from 'react';

import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const UserListItem = ({
	name,
	birthdate
}: {
  name: string;
  birthdate: string;
}) => {
	return (
		<>
			<ListItem>
				<ListItemAvatar>
					<Avatar sx={{ mr: 2 }}></Avatar>
				</ListItemAvatar>

				<ListItemText primary={name} secondary={birthdate} />
			</ListItem>
		</>
	);
};

export default UserListItem;
