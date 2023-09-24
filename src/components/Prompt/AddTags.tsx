import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Chip, IconButton, Stack, Typography } from '@mui/material';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

export default function AddTags({
	tags,
	addTags,
	deleteTag,
	resetTags
}: {
  tags: string[];
  addTags: (tags: string[]) => void;
  deleteTag: (tag: string) => void;
  resetTags: () => void;
}) {
	const [open, setOpen] = React.useState(false);
	const [tagField, setTagField] = React.useState<string>('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleTagAdd = (tag: string) => {
		if (tag.length < 1) {
			return;
		}
		if (tags.includes(tag)) {
			return;
		}
		if (tag.includes(',')) {
			tag = tag.replace(',', '');
		}
		addTags([...tags, tag]);
	};

	const exampleTags = [
		'family',
		'school',
		'career',
		'difficult',
		'happy',
		'sad',
		'love'
	];

	const handleResetTags = () => {
		resetTags();
	};

	return (
		<>
			<IconButton
				onClick={() => handleClickOpen()}
				sx={{ display: 'flex', flexDirection: 'column' }}
			>
				<BookmarksIcon color="primary" fontSize="medium" />
				<Typography color={'primary'} variant="caption">
          Edit Tags
				</Typography>
			</IconButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add Tags</DialogTitle>
				<DialogContent>
					<DialogContentText>
            Add comma separated tags to your prompt for better viewing results
            on the timeline.
					</DialogContentText>
					<DialogContentText>Example Tags:</DialogContentText>
					<Stack direction={'row'} spacing={1}>
						{exampleTags.map((tag, key) => (
							<Chip
								variant="outlined"
								label={tag}
								key={key}
								onClick={() => {
									handleTagAdd(tag);
								}}
							/>
						))}
					</Stack>
					<DialogContentText>
            Press enter to add a tag, press escape to close the dialog.
					</DialogContentText>

					<Stack
						direction={'row'}
						spacing={1}
						sx={{ marginTop: '1rem', marginBottom: '1rem' }}
					>
						{tags?.map((tag, key) => (
							<Chip
								variant="outlined"
								label={tag}
								key={key}
								onDelete={() => {
									deleteTag(tag);
								}}
							/>
						))}
					</Stack>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Add Tags"
						type="text"
						fullWidth
						variant="outlined"
						value={tagField}
						onChange={e => setTagField(e.target.value)}
						onKeyUp={e => {
							if (e.key === 'Enter') {
								handleTagAdd(tagField);

								setTagField('');
							}
							if (e.key === 'Escape') {
								handleClose();
							}
							if (e.key === ',') {
								handleTagAdd(tagField);
								setTagField('');
							}
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleResetTags}>Reset Tags</Button>
					<Button
						onClick={() => {
							handleTagAdd(tagField);
							setTagField('');
							handleClose();
						}}
					>
            Done Editing
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
