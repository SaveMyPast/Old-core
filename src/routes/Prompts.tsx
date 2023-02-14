import * as React from "react";
import ViewPrompt from "../components/Prompt/ViewPrompt";
import WritePrompt from "../components/Prompt/WritePrompt";
import { CircularProgress, Container } from "@mui/material";
import { useGetAllPrompts } from "../services/customHooks/useGetAllPrompts";

const Prompts = () => {
  const [prompts, error, loading] = useGetAllPrompts();
  const loadingPrompt = {
    id: "",
    age: 0,
    location: "",
    year: 0,
    prompt: "Loading...",
    userResponse: "",
    goodMemory: false,
  };

  if (error) {
    return (
      <>
        <div>Error:</div> <div>{JSON.stringify(error)}</div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Container>
          <CircularProgress />;
        </Container>
      </>
    );
  }

  return (
    <>
      <ViewPrompt promptData={prompts ? prompts[0] : loadingPrompt} />
      <WritePrompt promptData={prompts ? prompts[0] : loadingPrompt} />
    </>
  );
};

export default Prompts;
