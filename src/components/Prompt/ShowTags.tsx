import { Chip, Stack } from "@mui/material";
import * as React from "react";

const ShowTags = ({ tags }: { tags: string[] }) => {
  return (
    <>
      <Stack direction={"row"} spacing={1}>
        {tags.map((tag, key) => (
          <Chip variant="outlined" label={tag} key={key} />
        ))}
      </Stack>
    </>
  );
};

export default ShowTags;
