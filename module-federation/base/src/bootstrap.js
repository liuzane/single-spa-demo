import React from "root/react";
import ReactDOM from "root/react-dom";
import ReactDOMClient from "root/react-dom/client";
import moment from "root/moment";
import _ from "root/lodash";

import Root from "./root.component";

console.log("React", React);
console.log("ReactDOM", ReactDOM);
console.log("ReactDOMClient", ReactDOMClient);
console.log("moment", moment);
console.log("lodash", _);

const root = ReactDOMClient.createRoot(
  document.getElementById("single-spa-application:@laboratory/base")
);
root.render(
  <React.StrictMode>
    <Root name="base" />
  </React.StrictMode>
);