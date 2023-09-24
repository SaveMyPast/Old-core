import * as React from 'react';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Divider, IconButton, Paper, Stack } from '@mui/material';

const AdminTabSelector = ({
	setTab,
	tabs
}: {
  setTab: (tab: string) => void;
  tabs: string[];
}) => {
	return (
		<>
			<Paper elevation={0} variant="outlined" square>
				<Stack direction="row" spacing={1}>
					<IconButton onClick={() => setTab(tabs[0])}>
						<LibraryBooksIcon />
					</IconButton>
					<IconButton onClick={() => setTab(tabs[2])}>
						<LibraryAddIcon />
					</IconButton>
					<Divider orientation="vertical" flexItem />
					<IconButton>
						<PeopleAltIcon />
					</IconButton>
					<IconButton>
						<PersonAddIcon />
					</IconButton>
				</Stack>
			</Paper>
		</>
	);
};

export default AdminTabSelector;
