import React from "react";
import ReactDOM from "react-dom";
import ReactDOMClient from "react-dom/client";
import moment from "moment";
import _ from "lodash";
// import singleSpaReact from "single-spa-react";
import Root from "./root.component";

console.log("React", React);
console.log("ReactDOM", ReactDOM);
console.log("ReactDOMClient", ReactDOMClient);
console.log("moment", moment);
console.log("lodash", _);

const root = ReactDOMClient.createRoot(
  document.getElementById("single-spa-application:@laboratory/business")
);
root.render(
  <React.StrictMode>
    <Root name="business" />
  </React.StrictMode>
);