import * as React from "react";
import Scrollable from "../components/Timeline/Scrollable/Scrollable";
import Selected from "../components/Timeline/Selected/Selected";
import TimelineList from "../components/Timeline/List/TimelineList";
import { Container, Grid, Typography } from "@mui/material";
import { logEvent } from "firebase/analytics";
import { analytics } from "../services/firebase";

const Timeline = () => {
  React.useEffect(() => {
    logEvent(analytics, "view", { page: "timeline" });
  }, []);

  return (
    <>
      <Container>
        <Grid
          container
          spacing={2}
          justifyContent={"center"}
          alignItems={"baseline"}
        >
          <Grid item md={1} xs={4}>
            <Typography variant="subtitle2">Timeline</Typography>
            <Scrollable />
          </Grid>
          <Grid item md={4} xs={8}>
            <Typography variant="subtitle2">Prompts</Typography>
            <TimelineList />
          </Grid>
          <Grid item md={7} xs={11}>
            <Typography variant="subtitle2">Prompt Response</Typography>
            <Selected />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Timeline;
