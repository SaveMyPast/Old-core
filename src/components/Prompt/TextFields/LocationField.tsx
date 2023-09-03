import DateRangeIcon from "@mui/icons-material/DateRange";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useStore } from "@state-adapt/react";
import * as React from "react";
import { promptFormStore } from "../PromptFormStore/PromptFormStore";
import { LocationFormObject } from "../../../services/interfaces/PromptFormStoreInterface";

const LocationField = () => {
  const form = useStore(promptFormStore);

  const handleChange = (input: string) => {
    const location = {
      location: input,
      locationValid: form.state.location.locationValid,
      locationError: form.state.location.locationError,
    };

    promptFormStore.set({ ...form.state, location: location });
    validateLocation();
  };

  const validateLocation = () => {
    let location: LocationFormObject = {
      location: form.state.location.location,
      locationValid: form.state.location.locationValid,
      locationError: form.state.location.locationError,
    };

    const locationRegex = /^[a-zA-Z ]*$/;

    // TODO: Location verification -- string, not empty, not too long, no special characters.
    if (location.location.length > 0) {
      if (location.location.length > 30) {
        location.locationValid = false;
        location.locationError = "Location is too long.";
      } else if (!location.location.match(locationRegex)) {
        location.locationValid = false;
        location.locationError = "Location contains invalid characters.";
      } else {
        location.locationValid = true;
        location.locationError = "";
      }
    }

    promptFormStore.set({ ...form.state, location: location });
  };

  return (
    <TextField
      className="w-48"
      variant="outlined"
      size="small"
      onChange={(e) => {
        handleChange(e.target.value);
      }}
      label="Location"
      error={!form.state.location.locationValid}
      helperText={form.state.location.locationError}
      InputLabelProps={{ shrink: true }}
      placeholder="Where this took place"
      value={form.state.location.location}
    />
  );
};

export default LocationField;
