import * as React from "react";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useDeleteUser } from "../../services/customHooks/useDeleteUser";
import { getAuth } from "firebase/auth";

export const DeleteUser = () => {
  const [open, setOpen] = React.useState(false);
  const [deleteCurrentUser, error, loading] = useDeleteUser();
  const [valid, setValid] = React.useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (loading) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  const validateEmail = (email: string) => {
    if (currentUser !== null) {
      if (email === currentUser?.email) {
        setValid(true);
      } else {
        setValid(false);
      }
    } else {
      setValid(false);
      console.error("No user is signed in");
    }
  };

  return (
    <>
      <Container>
        <IconButton
          onClick={handleOpen}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <PersonRemoveIcon></PersonRemoveIcon>
          <Typography>Delete Account</Typography>
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete your account?
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Type your email to confirm"
              type="email"
              fullWidth
              variant="outlined"
              size="small"
              onChange={(e) => {
                validateEmail(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={deleteCurrentUser}
              color="primary"
              variant="contained"
              disabled={!valid}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default DeleteUser;
