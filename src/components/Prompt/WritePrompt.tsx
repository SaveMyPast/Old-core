import * as React from "react";
import {
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { PromptData } from "../../services/interfaces/interfaces";
import SaveIcon from "@mui/icons-material/Save";
import useSubmitPromptResponse from "../../services/customHooks/useSubmitPromptResponse";
import AddTags from "../Prompt/AddTags";
import SwapPrompt from "./SwapPrompt";
import ModifyPrompt from "./ModifyPrompt";
import { useAdapt } from "@state-adapt/react";
import ShowTags from "./ShowTags";

const promptActions = {
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  gap: "1rem",
};

const WritePrompt = ({ prompt }: { prompt: PromptData }) => {
  const [formData, formDataStore] = useAdapt<PromptData>(
    "promptResponse.formData",

    prompt
  );

  const [tags, tagsStore] = useAdapt<string[]>(
    "promptResponse.tags",
    prompt.tags
  );
  const [formValid, setFormValid] = React.useState<boolean>(false);
  const [submitPromptResponse, , failSend, sending] = useSubmitPromptResponse();

  const validateForm = () => {
    if (formData.state.userResponse.length < 1) {
      console.log("no response");
      setFormValid(false);
      return;
    }
    if (formData.state.age === 0) {
      console.log("no age");
      setFormValid(false);
      return;
    }
    if (formData.state.location.length < 1) {
      console.log("no location");
      setFormValid(false);
      return;
    }
    if (formData.state.year.length < 1) {
      console.log("no year");
      setFormValid(false);
      return;
    }
    if (formData.state.tags.length < 1) {
      console.log("no tags");
      setFormValid(false);
      return;
    }
    if (formData.state.id.length < 1) {
      formDataStore.set({ ...formData.state, id: prompt.id });
    }
    if (formData.state.prompt.length < 1) {
      formDataStore.set({ ...formData.state, prompt: prompt.prompt });
    }

    setFormValid(true);
  };

  const savePrompt = async () => {
    if (formValid) {
      console.log(formData);
      submitPromptResponse(formData.state);
    } else {
      console.log("form not valid");
    }
  };

  const handleDeleteTag = (tag: string) => {
    const newTags = tags.state.filter((t) => t !== tag);
    tagsStore.set(newTags);
    formDataStore.set({ ...formData.state, tags: newTags });
  };

  if (sending) {
    return <CircularProgress />;
  }

  if (failSend) {
    return (
      <>
        <Typography variant="h4">Failed to send, try again later</Typography>
        <Typography color={"warning"}>{failSend}</Typography>
      </>
    );
  }

  return (
    <>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Container sx={promptActions}>
          <ShowTags tags={tags.state} />

          <SwapPrompt />
          <ModifyPrompt
            prompt={prompt}
            formData={formData.state}
            setFormData={(formData: PromptData) => {
              formDataStore.set(formData);
              validateForm();
            }}
          />
        </Container>
        <TextField
          id="outlined-multiline-static"
          label="Write your experience here."
          placeholder="Around this time of my life..."
          multiline
          fullWidth
          rows={10}
          onChange={(e) => {
            formDataStore.set({
              ...formData.state,
              userResponse: e.target.value,
            });
            validateForm();
          }}
        />
        <Container
          sx={{
            marginTop: "1rem",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: true }}
            label="Year"
            onChange={(e) => {
              formDataStore.set({ ...formData.state, year: e.target.value });
              validateForm();
            }}
            type="date"
          />
          <TextField
            variant="outlined"
            size="small"
            type={"number"}
            onChange={(e) => {
              formDataStore.set({
                ...formData.state,
                age: parseInt(e.target.value),
              });
              validateForm();
            }}
            InputLabelProps={{ shrink: true }}
            label="Your Age"
            placeholder="Your age at the time"
          />
          <TextField
            variant="outlined"
            size="small"
            onChange={(e) => {
              formDataStore.set({
                ...formData.state,
                location: e.target.value,
              });
              validateForm();
            }}
            label="Location"
            InputLabelProps={{ shrink: true }}
            placeholder="Where this took place"
          />

          <AddTags
            tags={tags.state}
            deleteTag={(tag) => {
              handleDeleteTag(tag);
            }}
            addTags={(tag: string[]) => {
              tagsStore.set(tag);
              formDataStore.set({ ...formData.state, tags: tag });
              validateForm();
            }}
          />

          <IconButton
            onClick={savePrompt}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <SaveIcon color="primary" fontSize="medium" />
            <Typography color={"primary"} variant="caption">
              Save
            </Typography>
          </IconButton>
        </Container>
      </Container>
    </>
  );
};

export default WritePrompt;
