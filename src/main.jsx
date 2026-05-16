import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TypingTest from "./TypingTest.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TypingTest />
  </StrictMode>
);
