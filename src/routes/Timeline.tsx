import * as React from "react";
import Scrollable from "../components/Timeline/Scrollable/Scrollable";
import Selected from "../components/Timeline/Selected/Selected";
import TimelineList from "../components/Timeline/List/TimelineList";
import { Container, Grid } from "@mui/material";

const Timeline = () => {
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
            <Scrollable />
          </Grid>
          <Grid item md={4} xs={8}>
            <TimelineList />
          </Grid>
          <Grid item md={7} xs={11}>
            <Selected />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Timeline;
