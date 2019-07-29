import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import {ApolloProvider} from "react-apollo";
import {apolloClient} from "util/index";
// core components
import Admin from "layouts/Admin.jsx";

import "assets/css/material-dashboard-react.css?v=1.7.0";
import MyCollections from "views/MyCollections/MyCollections";

const hist = createBrowserHistory();

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Router history={hist}>
      <Switch>
        <Route path="/" component={Admin} />
        <Route path="/my_collections" component={MyCollections} />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
