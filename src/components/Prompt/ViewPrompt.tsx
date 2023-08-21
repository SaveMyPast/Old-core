import * as React from "react";
import { CircularProgress, Container, Paper, Typography } from "@mui/material";
import { useStore } from "@state-adapt/react";
import { promptStore } from "../../services/stores/promptStore";

const ViewPrompt = () => {
  const store = useStore(promptStore);

  React.useEffect(() => {
    promptStore.toggleViewedPrompt(store.viewActivePrompt);
  }, [store.viewActivePrompt]);

  if (store.viewActivePrompt) {
    return (
      <>
        <Paper elevation={0}>
          <Container sx={{ padding: "12px" }}>
            <Typography variant="h6" textAlign={"left"}>
              {store.viewActivePrompt.prompt}
            </Typography>
          </Container>
        </Paper>
      </>
    );
  }

  return (
    <>
      <Container>
        <CircularProgress />;
      </Container>
    </>
  );
};
export default ViewPrompt;
