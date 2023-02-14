import { Grid, Paper, Typography, Link, Button } from "@mui/material";
import * as React from "react";
import WelcomeCards from "../components/Welcome/WelcomeCards";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const Navigator = useNavigate();
  return (
    <>
      <Grid container flexDirection={"column"} spacing={3}>
        <Paper sx={{ padding: "12px" }} elevation={0}>
          <Grid item xs={12}>
            <Typography variant="h4" textAlign="center">
              SaveMyPast: Your personal history, organized
            </Typography>
          </Grid>
        </Paper>
        <Grid item xs={12}>
          <Grid item container flexDirection={"row"} spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: "36px" }} elevation={0}>
                <Typography variant="h6" textAlign="left">
                  A personal history app designed to help you capture your
                  memories and experiences one memory at a time, using prompts
                  to guide you. You can remember all of your previous prompt
                  responses on a beautiful timeline, and even integrate your
                  memories with familysearch.org to ensure that future
                  generations will be able to access and learn from your life
                  story.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: "36px", height: "100%" }} elevation={0}>
                <Typography variant="h6" textAlign="left">
                  When you sign in to SaveMyPast, you will be greeted with a
                  custom prompt to get you started on your personal history.
                  Each prompt is designed to get the details of your life story
                  secured, while also providing you with a fun and engaging
                  experience. You can write your personal history one memory at
                  a time.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <WelcomeCards />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: "12px" }} elevation={0}>
            <Typography variant="h6" textAlign="center">
              Sign up to get started
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} alignSelf={"center"}>
          <Button
            variant="contained"
            onClick={() => {
              Navigator("/register");
            }}
            sx={{ marginBottom: "36px" }}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Welcome;
