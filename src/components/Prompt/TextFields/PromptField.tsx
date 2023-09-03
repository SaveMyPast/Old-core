import { TextField } from "@mui/material";
import { useStore } from "@state-adapt/react";
import * as React from "react";
import { promptFormStore } from "../PromptFormStore/PromptFormStore";
import { UserResponseFormObject } from "../../../services/interfaces/PromptFormStoreInterface";

const PromptField = () => {
  const form = useStore(promptFormStore);

  const validateResponse = () => {
    let response: UserResponseFormObject = {
      response: form.state.userResponse.response,
      responseValid: form.state.userResponse.responseValid,
      responseError: form.state.userResponse.responseError,
    };

    if (form.state.userResponse.response.length > 0) {
      response.responseValid = true;
      response.responseError = "";
      promptFormStore.set({ ...form.state, userResponse: response });
    } else {
      response.responseValid = false;
      response.responseError = "Response is required";
      promptFormStore.set({ ...form.state, userResponse: response });
    }
  };

  const handleChange = (input: string) => {
    const response: UserResponseFormObject = {
      response: input,
      responseValid: form.state.userResponse.responseValid,
      responseError: form.state.userResponse.responseError,
    };

    promptFormStore.set({ ...form.state, userResponse: response });
    validateResponse();
  };
  return (
    <TextField
      id="outlined-multiline-static"
      label="Write your experience here."
      placeholder="Around this time of my life..."
      multiline
      fullWidth
      rows={10}
      onChange={(e) => {
        handleChange(e.target.value);
      }}
      error={!form.state.userResponse.responseValid}
      helperText={form.state.userResponse.responseError}
      value={form.state.userResponse.response}
    />
  );
};

export default PromptField;
