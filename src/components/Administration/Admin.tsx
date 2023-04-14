import { Grid } from "@mui/material";
import * as React from "react";
import AdminListView from "./Prompts/AdminListView";
import AdminTabSelector from "./AdminTabSelector";
import AdminViewPrompts from "./Prompts/AdminViewPrompts";

const Admin = () => {
  return (
    <>
      <Grid container justifyContent={"center"} spacing={2}>
        <Grid
          container
          item
          xs={12}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={"auto"}>
            <AdminTabSelector />
          </Grid>
        </Grid>

        <Grid container item xs={11} spacing={2}>
          <Grid item xs={4}>
            <AdminListView />
          </Grid>
          <Grid item xs={8}>
            <AdminViewPrompts />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Admin;
