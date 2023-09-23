import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ModifyPromptPayload } from '../../services/interfaces/interfaces';
import { promptStore } from '../../services/stores/promptStore';
import { useStore } from '@state-adapt/react';
import { promptFormStore } from './PromptFormStore/PromptFormStore';

export const ModifyPrompt = () => {
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const prompt = useStore(promptStore);
	const form = useStore(promptFormStore);

	const handleClose = () => {
		setOpen(false);
	};

	const handleModifyPrompt = (newPrompt: string) => {
		const payload: ModifyPromptPayload = {
			current: prompt.activePrompt,
			new: { ...prompt.activePrompt, prompt: newPrompt }
		};

		promptStore.modifyPrompt(payload);
	};

	return (
		<>
			<IconButton
				onClick={() => handleClickOpen()}
				sx={{ display: 'flex', flexDirection: 'column' }}
			>
				<EditIcon color="primary" fontSize="medium" />
				<Typography color={'primary'} variant="caption">
          Edit Prompt
				</Typography>
			</IconButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit Prompt</DialogTitle>
				<DialogContent>
					<DialogContentText>
            Modify the prompt below or create a custom prompt. This will replace
            the current prompt as though it were the original.
					</DialogContentText>

					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Modify Prompt"
						type="text"
						fullWidth
						variant="outlined"
						multiline
						rows={4}
						error={!form.state.prompt.promptValid}
						helperText={form.state.prompt.promptError}
						defaultValue={prompt.activePrompt.prompt}
						onChange={e => {
							handleModifyPrompt(e.target.value);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
					<Button
						onClick={() => {
							handleClose();
						}}
					>
            Close dialogue
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ModifyPrompt;
