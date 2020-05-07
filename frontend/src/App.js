import React from 'react';
import logo from './logo.svg';
import { Credit } from './features/credit/Credit';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <a className="navbar-brand">Zinobe</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link to="/my-credits" className="nav-link">Mis creditos</Link>
              </li>
              <li className="nav-item">
                <Link to="/users" className="nav-link">Users</Link>
              </li>
            </ul>
          </div>

        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/my-credits">
            <About />
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

function Home() {
  return (
    <div className="container">
      <div className="mt-5 pt-5">
        <Credit />
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="mt-5 pt-5">
      <h2>About</h2>
    </div>
  );
}

function Users() {
  return (
    <div className="mt-5 pt-5">
      <h2>Users</h2>
    </div>
  );
}

export default App;
