import React from 'react';
import {
  Nav,
  Home,
  MyCredits,
  DeniedCredits,
  Signup,
  Login,
  UserCreditLine,
  UserList
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
      <div className="h-100">
        <Nav />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/my-credits">
            <MyCredits />
          </Route>
          <Route path="/denied-credits">
            <DeniedCredits />
          </Route>
          <Route path="/user-credit-line">
            <UserCreditLine />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
