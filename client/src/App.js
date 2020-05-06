import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join/Join";
import Main from "./components/Main/Main";
import Exit from "./components/Exit/Exit";

const App = () => (
  <Router>
    <Route path="/" exact component={Join} />
    <Route path="/main" component={Main} />
  </Router>
);

export default App;
