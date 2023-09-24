import * as React from 'react';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { PromptData } from '../../../services/interfaces/interfaces';
import { promptStore } from '../../../services/stores/promptStore';

export const PromptListItem = ({ prompt }: { prompt: PromptData }) => {
    return (
        <>
            <ListItem divider>
                <ListItemText
                    className="truncate "
                    secondary={prompt.prompt}
                ></ListItemText>
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
