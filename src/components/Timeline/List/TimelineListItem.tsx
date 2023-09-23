import * as React from 'react';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SelectablePromptData } from '../../../services/interfaces/interfaces';
import { userResponseStore } from '../../../services/stores/userResponseStore';
import { analytics } from '../../../services/firebase';
import { logEvent } from 'firebase/analytics';

const shortenString = (string: string) => {
	const colWidth = window.innerWidth / 12;
	const numChars = Math.floor((colWidth / 10) * 4);
	return string.length > numChars
		? `${string.substring(0, numChars)  }...`
		: string;
};

export const TimelineListItem = ({
	prompt
}: {
  prompt: SelectablePromptData;
}) => {
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
						userResponseStore.selectResponse(prompt);
						logEvent(analytics, 'timeline_select_prompt', {
							prompt: prompt.prompt,
							id: prompt.id
						});
					}}
				>
					<ChevronRightIcon />
				</IconButton>
			</ListItem>
		</>
	);
};

export default TimelineListItem;
