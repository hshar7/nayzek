import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import RTL from "layouts/RTL.jsx";

import "assets/css/material-dashboard-react.css?v=1.7.0";
import MyCollections from "views/MyCollections/MyCollections";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" component={Admin}/>
      <Route path="/my_collections" component={MyCollections}/>
    </Switch>
  </Router>,
  document.getElementById("root")
);
