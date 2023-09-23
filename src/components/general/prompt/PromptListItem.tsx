import * as React from 'react';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { PromptData } from '../../../services/interfaces/interfaces';
import { promptStore } from '../../../services/stores/promptStore';

const shortenString = (string: string) => {
	const colWidth = window.innerWidth / 12;
	const numChars = Math.floor((colWidth / 10) * 4);
	return string.length > numChars
		? `${string.substring(0, numChars)  }...`
		: string;
};

export const PromptListItem = ({ prompt }: { prompt: PromptData }) => {
	const [promptShortened, setPromptShortened] = React.useState<string>(
		shortenString(prompt.prompt)
	);

	React.useEffect(() => {
		function handleResize() {
			setPromptShortened(shortenString(prompt.prompt));
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<>
			<ListItem divider>
				<ListItemText secondary={promptShortened}></ListItemText>
				<IconButton
					onClick={() => {
						promptStore.setActivePrompt(prompt);
					}}
				>
					<ChevronRightIcon />
				</IconButton>
			</ListItem>
		</>
	);
};

export default PromptListItem;
