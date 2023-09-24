import { Grid } from '@mui/material';
import * as React from 'react';
import AdminListView from './Prompts/AdminListView';
import AdminTabSelector from './AdminTabSelector';
import AdminViewPrompts from './Prompts/AdminViewPrompts';
import AdminAddPrompt from './Prompts/AdminAddPrompt';

const tabs = ['Prompts', 'Users', 'AddPrompt', 'EditUser'];

const Admin = () => {
	const [selectedTab, setSelectedTab] = React.useState(tabs[0]);

	if (selectedTab === 'Prompts') {
		return (
			<>
				<Grid container justifyContent={'center'} spacing={2}>
					<Grid
						container
						item
						xs={12}
						justifyContent={'center'}
						alignItems={'center'}
					>
						<Grid item xs={'auto'}>
							<AdminTabSelector
								tabs={tabs}
								setTab={(tab: string) => setSelectedTab(tab)}
							/>
						</Grid>
					</Grid>

					<Grid container item xs={11} spacing={2}>
						<Grid item xs={4}>
							<AdminListView />
						</Grid>
						<Grid item xs={8}>
							<AdminViewPrompts />
						</Grid>
					</Grid>
				</Grid>
			</>
		);
	}

	// TODO: Add User Tab

	if (selectedTab === 'AddPrompt') {
		return (
			<>
				<Grid container justifyContent={'center'} spacing={2}>
					<Grid
						container
						item
						xs={12}
						justifyContent={'center'}
						alignItems={'center'}
					>
						<Grid item xs={'auto'}>
							<AdminTabSelector
								tabs={tabs}
								setTab={(tab: string) => setSelectedTab(tab)}
							/>
						</Grid>
					</Grid>

					<Grid item xs={11}>
						<AdminAddPrompt />
					</Grid>
				</Grid>
			</>
		);
	}

	return (
		<>
			<Grid container justifyContent={'center'} spacing={2}>
				<Grid
					container
					item
					xs={12}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<Grid item xs={'auto'}>
						<AdminTabSelector
							tabs={tabs}
							setTab={(tab: string) => setSelectedTab(tab)}
						/>
					</Grid>
				</Grid>

				<Grid container item xs={11} spacing={2}>
					<Grid item xs={4}>
						<AdminListView />
					</Grid>
					<Grid item xs={8}>
						<AdminViewPrompts />
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default Admin;
