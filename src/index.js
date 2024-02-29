import React from "react";
import ReactDOM from "react-dom/client";
import Weathercard from "./weathercard";
import Temp from "./temp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Temp />
    {/* <Weathercard /> */}
  </React.StrictMode>
);

