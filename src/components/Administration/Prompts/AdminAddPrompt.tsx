import {
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAdapt } from "@state-adapt/react";
import * as React from "react";
import AddTags from "../../Prompt/AddTags";
import ShowTags from "../../Prompt/ShowTags";
import AdminViewPrompts from "./AdminViewPrompts";
import SaveIcon from "@mui/icons-material/Save";
import { AddPromptData } from "../../../services/interfaces/interfaces";
import { emptyPromptData } from "../../../services/stores/promptStore";
import useAdminAddPrompt from "../../../services/customHooks/useAdminAddPrompt";

const AdminAddPrompt = () => {
  const [adminAddPrompt, success, error, loading] = useAdminAddPrompt();

  const [inputControl, inputControlStore] = useAdapt<{
    formValid: boolean;
    prompt: string;
    promptValid: boolean;
    age: string;
    ageValid: boolean;
    tags: string;
    tagsValid: boolean;
  }>("admin.addPrompt.inputControl", {
    formValid: false,
    prompt: "Enter prompt",
    promptValid: false,
    age: "Enter age",
    ageValid: false,
    tags: "Enter at least one tag",
    tagsValid: false,
  });

  const [form, formStore] = useAdapt<AddPromptData>(
    "admin.addPrompt.form",
    emptyPromptData
  );

  const handleDeleteTag = (tag: string) => {
    const newTags = form.state.tags.filter((t) => t !== tag);
    formStore.update({ ...form.state, tags: newTags });
  };

  const handleVerifyForm = () => {
    if (form.state.prompt === "") {
      inputControlStore.update({
        promptValid: false,
        prompt: "Enter a prompt.",
      });
    } else {
      inputControlStore.update({ promptValid: true, prompt: "" });
    }

    if (form.state.age === 0) {
      inputControlStore.update({ ageValid: false, age: "Enter an age." });
    } else {
      inputControlStore.update({ ageValid: true, age: "" });
    }

    if (form.state.tags.length === 0) {
      inputControlStore.update({
        tagsValid: false,
        tags: "Enter at least one tag.",
      });
    } else {
      inputControlStore.update({ tagsValid: true, tags: "" });
    }

    if (
      inputControl.state.promptValid &&
      inputControl.state.ageValid &&
      inputControl.state.tagsValid
    ) {
      inputControlStore.update({ formValid: true });
    } else {
      inputControlStore.update({ formValid: false });
    }
  };

  const handleAddPrompt = () => {
    handleVerifyForm();
    if (!inputControl.state.formValid) {
      return;
    } else {
      adminAddPrompt(form.state);
      if (success) {
        formStore.set(emptyPromptData);
      }
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        direction={"column"}
      >
        <Grid item xs={12}>
          <Typography variant={"h4"} align={"center"}>
            Add Prompt
          </Typography>
        </Grid>
        <Grid item container xs={12} spacing={2} direction={"row"}>
          <Grid item xs={12} md={7}>
            <Grid item container xs={12} spacing={2} direction={"column"}>
              <Grid item xs={12}>
                <ShowTags tags={form.state.tags} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  minRows={4}
                  fullWidth
                  label={"Prompt"}
                  value={form.state.prompt}
                  error={!inputControl.state.promptValid}
                  onChange={(e) => {
                    formStore.update({
                      ...form.state,
                      prompt: e.target.value,
                    });
                    handleVerifyForm();
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid item container direction={"row"} spacing={2}>
                  <Grid item>
                    <TextField
                      label={"Age"}
                      type={"number"}
                      value={form.state.age}
                      error={!inputControl.state.ageValid}
                      onChange={(e) => {
                        formStore.update({
                          ...form.state,
                          age: Number(e.target.value),
                        });
                        handleVerifyForm();
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Stack direction={"row"} spacing={2}>
                      <IconButton onClick={handleAddPrompt}>
                        <Stack direction={"column"}>
                          {loading ? (
                            <CircularProgress color="primary" />
                          ) : (
                            <SaveIcon color="primary" />
                          )}

                          <Typography color={"primary"} variant={"caption"}>
                            Add
                          </Typography>
                        </Stack>
                      </IconButton>

                      <AddTags
                        tags={form.state.tags}
                        deleteTag={(tag) => {
                          handleDeleteTag(tag);
                        }}
                        addTags={(tag: string[]) => {
                          formStore.update({
                            ...form.state,
                            tags: tag,
                          });
                          handleVerifyForm();
                        }}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center" color={"error"} variant={"caption"}>
                  {inputControl.state.prompt} {inputControl.state.age}{" "}
                  {inputControl.state.tags} {error} {success}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            <AdminViewPrompts />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminAddPrompt;
