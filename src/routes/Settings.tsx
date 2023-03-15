import * as React from "react";
import DeleteUser from "../components/settings/DeleteUser";
import { Container, Typography } from "@mui/material";

const Settings = () => {
  return (
    <>
      <Container>
        <Typography variant="h2">User Settings</Typography>
        <DeleteUser />
      </Container>
    </>
  );
};

export default Settings;
