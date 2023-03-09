import * as React from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes } from "react-router-dom";
import Welcome from "./routes/Welcome";
import Profile from "./routes/Profile";
import Prompts from "./routes/Prompts";
import Settings from "./routes/Settings";
import Timeline from "./routes/Timeline";
import Administration from "./routes/Administration";
import Navigation from "./components/general/navigation/Navigation";
import Login from "./components/general/Auth/Login";
import ForgotPassword from "./components/general/Auth/ForgotPassword";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./services/firebase";
import { Container } from "@mui/system";
import Register from "./components/general/Auth/Register";
import ModifyPrompt from "./components/Prompt/ModifyPrompt";

function App() {
  const [user] = useAuthState(auth);
  if (!user) {
    return (
      <>
        <Navigation></Navigation>
        <Container sx={{ height: "100px" }} />

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Navigation></Navigation>
        <Container sx={{ height: "100px" }} />

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </>
    );
  }
}

export default App;
