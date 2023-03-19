import * as React from "react";

import { userResponseStore } from "../../../services/stores/userResponseStore";
import { useStore } from "@state-adapt/react";
import { Typography } from "@mui/material";

export const Selected = () => {
  const userResponses = useStore(userResponseStore);

  return (
    <>
      <Typography>{userResponses.viewSelectedResponse?.prompt}</Typography>
    </>
  );
};

export default Selected;
