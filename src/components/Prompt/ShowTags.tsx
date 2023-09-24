import { Chip, Stack } from '@mui/material';
import * as React from 'react';

export const ShowTags = ({ tags }: { tags: string[] }) => {
    return (
        <>
            <Stack direction={'row'} spacing={1}>
                {tags.map((tag, key) => (
                    <Chip variant="outlined" label={tag} key={key} />
                ))}
            </Stack>
        </>
    );
};

export const ShowTagsVertical = ({ tags }: { tags: string[] }) => {
    return (
        <>
            <Stack
                direction={'column'}
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={1}
            >
                {tags.map((tag, key) => (
                    <Chip variant="outlined" label={tag} key={key} />
                ))}
            </Stack>
        </>
    );
};

export default ShowTags;
