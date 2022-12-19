import * as React from "react";

import { Button, Typography } from "@mui/material";
import { auth } from "../../../services/firebase";
import { useSignOut } from "react-firebase-hooks/auth";

const Signout = () => {
  const [signOut, loading, error] = useSignOut(auth);

  if (error) {
    return <Typography>{error.message}</Typography>;
  }
  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <>
      <Button
        variant="contained"
        size="large"
        onClick={signOut}
        sx={{ marginTop: "6px" }}
      >
        Sign Out
      </Button>
    </>
  );
};

export default Signout;
