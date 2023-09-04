import * as React from "react";

import ViewPrompt from "../components/Prompt/ViewPrompt";
import WritePrompt from "../components/Prompt/WritePrompt";
import SelectAPrompt from "../components/Prompt/SelectAPrompt";
import { Container, Grid } from "@mui/material";
import { logEvent } from "firebase/analytics";
import { analytics } from "../services/firebase";

const Prompts = () => {
  React.useEffect(() => {
    logEvent(analytics, "view", { page: "prompts" });
  }, []);

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item sm={3}>
            <SelectAPrompt />
          </Grid>

          <Grid item sm={9}>
            <ViewPrompt />
            <WritePrompt />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Prompts;
