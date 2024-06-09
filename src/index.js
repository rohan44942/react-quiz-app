import React, { StrictMode } from "react";
import reactDom from "react-dom/client";
import "./index.css";
import App from "./components/App";
// import reportWebVitals from "./reportWebVitals";
const root = reactDom.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
// reportWebVitals();
