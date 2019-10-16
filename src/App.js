import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Main from "./components/Main.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <HashRouter>
      <Route component={Header} />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/movie/:movieId" component={MovieDetails} />
      </Switch>
    </HashRouter>
  );
}

export default App;
