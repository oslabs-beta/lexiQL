import React from "react";
import { render } from "react-dom";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import "./stylesheets/index.scss";

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
