import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationIcon from "@mui/icons-material/LocationOn";
import { Bookmarks } from "@mui/icons-material";
import Chip from "@mui/material/Chip";
import { PromptData } from "../../../services/interfaces/interfaces";
import { Divider, Stack, Typography } from "@mui/material";
import PromptEditDialog from "../../Administration/Prompts/PromptEditDialogue";

import { promptStore } from "../../../services/stores/promptStore";

export const PromptMetaData = ({
  prompt,
  isEditable = false,
  tags,
}: {
  prompt: PromptData;
  isEditable?: boolean;
  tags: string[];
}) => {
  const deleteTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    const newPrompt = { ...prompt, tags: newTags };
    promptStore.modifyPrompt({ current: prompt, new: newPrompt });
  };

  return (
    <>
      <Stack direction="row" alignItems={"center"} spacing={2}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          {isEditable && (
            <PromptEditDialog
              prompt={prompt}
              tags={tags}
              deleteTag={deleteTag}
            />
          )}
          <DateRangeIcon />
          <Typography variant="caption">{prompt.year}</Typography>
          <Typography variant="caption">Age {prompt.age}</Typography>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <LocationIcon />
          <Typography variant="caption">{prompt.location}</Typography>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack direction={"row"} spacing={1}>
          <Bookmarks />
          {tags.map((tag) => (
            <Chip variant="outlined" key={tag} label={tag} size="small" />
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default PromptMetaData;
