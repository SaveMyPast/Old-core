import * as React from "react";
import { CircularProgress, Container, Paper, Typography } from "@mui/material";
import { PromptData } from "../../services/interfaces";

const ViewPrompt = ({ prompt }: { prompt: PromptData | null }) => {
  if (prompt === null) {
    return (
      <>
        <Container>
          <Typography variant="h6" textAlign={"left"}>
            No prompts available
          </Typography>
        </Container>
      </>
    );
  }

  if (prompt) {
    return (
      <>
        <Paper elevation={0}>
          <Container sx={{ padding: "12px" }}>
            <Typography variant="h6" textAlign={"left"}>
              {prompt.prompt}
            </Typography>
          </Container>
        </Paper>
      </>
    );
  }

  return (
    <>
      <Container>
        <CircularProgress />;
      </Container>
    </>
  );
};
export default ViewPrompt;
