import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import AddTags from "../../Prompt/AddTags";
import ShowTags from "../../Prompt/ShowTags";
import { PromptData } from "../../../services/interfaces/interfaces";
import { IconButton, Stack } from "@mui/material";
import * as React from "react";
import useAdminAddPrompt from "../../../services/customHooks/useAdminAddPrompt";

export const PromptEditDialog = ({
  prompt,
  tags,
  deleteTag,
}: {
  prompt: PromptData;
  tags: string[];
  deleteTag: (tag: string) => void;
}) => {
  const [adminEditPrompt, success, error, loading] = useAdminAddPrompt();
  const [open, setOpen] = React.useState(false);
  const [newPrompt, setNewPrompt] = React.useState<PromptData>(prompt);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validatePrompt = (prompt: PromptData) => {
    // tags prompt and age
  };

  const handleSave = () => {};

  return (
    <>
      <IconButton color="primary" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth={"sm"} fullWidth>
        <DialogTitle>Edit Prompt</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <ShowTags tags={prompt.tags} />
            <TextField
              autoFocus
              margin="dense"
              size="small"
              multiline
              rows={4}
              id="name"
              label="Prompt"
              InputLabelProps={{ shrink: true }}
              defaultValue={prompt.prompt}
              fullWidth
              type="text"
            />
            <Stack direction={"row"} spacing={2}>
              <TextField
                size="small"
                id="age"
                InputLabelProps={{ shrink: true }}
                label="Age"
                defaultValue={prompt.age}
              />
              <AddTags
                tags={tags}
                addTags={(tags: string[]) => {}}
                deleteTag={(tag: string) => {
                  deleteTag(tag);
                }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button>Save Prompt</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PromptEditDialog;
