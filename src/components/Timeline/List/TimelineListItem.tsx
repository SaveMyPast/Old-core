import * as React from 'react';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SelectablePromptData } from '../../../services/interfaces/interfaces';
import { userResponseStore } from '../../../services/stores/userResponseStore';
import { analytics } from '../../../services/firebase';
import { logEvent } from 'firebase/analytics';

export const TimelineListItem = ({
    prompt,
}: {
    prompt: SelectablePromptData;
}) => {
    return (
        <>
            <ListItem divider>
                <ListItemText
                    className="truncate"
                    secondary={prompt.prompt}
                ></ListItemText>
                <IconButton
                    onClick={() => {
                        userResponseStore.selectResponse(prompt);
                        logEvent(analytics, 'timeline_select_prompt', {
                            prompt: prompt.prompt,
                            id: prompt.id,
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
