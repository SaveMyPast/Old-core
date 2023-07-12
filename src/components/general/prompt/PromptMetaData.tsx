import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationIcon from "@mui/icons-material/LocationOn";
import { Bookmarks } from "@mui/icons-material";
import Chip from "@mui/material/Chip";
import { PromptData } from "../../../services/interfaces/interfaces";
import { Divider, Stack, Typography } from "@mui/material";

export const PromptMetaData = ({ prompt }: { prompt: PromptData }) => {
  return (
    <>
      <Stack direction="row" alignItems={"center"} spacing={2}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
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
          {prompt.tags.map((tag) => (
            <Chip variant="outlined" key={tag} label={tag} size="small" />
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default PromptMetaData;
