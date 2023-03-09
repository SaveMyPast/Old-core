import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  ModifyPromptPayload,
  PromptData,
  SubmitPromptData,
} from "../../services/interfaces";
import { promptStore } from "../../services/stores/promptStore";
import { useAdapt } from "@state-adapt/react";

export const ModifyPrompt = ({
  prompt,
  formData,
  setFormData,
}: {
  prompt: PromptData;
  formData: SubmitPromptData;
  setFormData: (formData: SubmitPromptData) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModifyPrompt = (newPrompt: string) => {
    const payload: ModifyPromptPayload = {
      current: { ...prompt },
      new: { ...prompt, prompt: newPrompt },
    };
    promptStore.modifyPrompt(payload);
  };

  return (
    <>
      <IconButton
        onClick={() => handleClickOpen()}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <EditIcon color="primary" fontSize="medium" />
        <Typography color={"primary"} variant="caption">
          Edit Prompt
        </Typography>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Prompt</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modify the prompt below or create a custom prompt. This will replace
            the current prompt and you will not be presented this prompt again.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Modify Prompt"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            defaultValue={prompt.prompt}
            onChange={(e) => {
              setFormData({ ...formData, prompt: e.target.value });
              handleModifyPrompt(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Save Prompt
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModifyPrompt;
