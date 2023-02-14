import * as React from "react";
import { Container, Paper, Typography } from "@mui/material";
import { PromptData } from "../../services/interfaces";

const ViewPrompt = ({ promptData }: { promptData: PromptData }) => {
  return (
    <>
      <Paper elevation={0}>
        <Container sx={{ padding: "12px" }}>
          <Typography variant="h6" textAlign={"left"}>
            {promptData.prompt}
          </Typography>
        </Container>
      </Paper>
    </>
  );
};

export default ViewPrompt;
