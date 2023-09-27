import { Popover, Chip, Stack, Box } from '@mui/material';
import * as React from 'react';

const CollapsedTags = ({ tags }: { tags: string[] }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Chip
                variant="outlined"
                label={`+${tags.length}`}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                size="small"
            />
            <>
                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: 'none',
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Box className="p-2">
                        <Stack direction={'column'} spacing={1}>
                            {tags.map((tag, key) => (
                                <Chip
                                    variant="outlined"
                                    label={tag}
                                    key={key}
                                    size="small"
                                />
                            ))}
                        </Stack>
                    </Box>
                </Popover>
            </>
        </>
    );
};

export const ShowTags = ({ tags }: { tags: string[] }) => {
    const maxLength = 4;
    const hiddenTags = tags.slice(maxLength);

    if (tags.length > maxLength) {
        return (
            <>
                <Stack direction={'row'} spacing={1}>
                    {tags.slice(0, maxLength).map((tag, key) => (
                        <Chip
                            variant="outlined"
                            label={tag}
                            key={key}
                            size="small"
                        />
                    ))}
                    {hiddenTags.length > 0 && (
                        <CollapsedTags tags={hiddenTags} />
                    )}
                </Stack>
            </>
        );
    }

    return (
        <>
            <Stack direction={'row'} spacing={1}>
                {tags.map((tag, key) => (
                    <Chip
                        variant="outlined"
                        label={tag}
                        key={key}
                        size="small"
                    />
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
                    <Chip
                        variant="outlined"
                        label={tag}
                        key={key}
                        size="small"
                    />
                ))}
            </Stack>
        </>
    );
};

export default ShowTags;
