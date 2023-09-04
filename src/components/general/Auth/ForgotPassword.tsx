import * as React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "../../../services/firebase";
import { useState } from "react";
import { analytics } from "../../../services/firebase";
import { logEvent } from "firebase/analytics";

const ForgotPassword = () => {
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const [resetEmail, setResetEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleReset = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    sendPasswordResetEmail(resetEmail);
    logEvent(analytics, "password_reset_attempt", { email: resetEmail });

    if (!error) {
      setEmailSent(true);
    }
  };

  const sentButton = (
    <Button variant="contained" type="submit" disabled>
      Check your email.
    </Button>
  );

  const sendingButton = (
    <Button variant="contained" type="submit" disabled>
      Sending...
    </Button>
  );

  const sendButton = (
    <Button variant="contained" type="submit">
      Send Email
    </Button>
  );

  return (
    <>
      <form onSubmit={handleReset}>
        <Grid
          container
          spacing={3}
          alignContent={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <Grid item xs={12} md={8}>
            <Typography textAlign={"center"}>
              Enter your email address to reset your email.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="Email"
              label="email"
              type={"email"}
              onChange={(event) => setResetEmail(event.target.value)}
              autoComplete="email"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {emailSent ? sentButton : sending ? sendingButton : sendButton}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ForgotPassword;
