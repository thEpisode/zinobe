import React from 'react';
import {
  Nav,
  Home,
  MyCredits
} from './components/index';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App () {
  return (
    <Router>
      <div>
        <Nav />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/my-credits">
            <MyCredits />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

function Users () {
  return (
    <div className="mt-5 pt-5">
      <h2>Users</h2>
    </div>
  );
}

export default App;
