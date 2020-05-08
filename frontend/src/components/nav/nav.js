import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectIsLoggedin } from './../../app/reducers/user.reducer'

export function Nav () {
  const isLoggedin = useSelector(selectIsLoggedin);

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <Link to="/" className="navbar-brand">Zinobe</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse">
        {isLoggedin ? <LoggedinNav /> : <LoggedoutNav />}
      </div>
    </nav>
  )
}

function LoggedinNav () {
  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to="/my-credits" className="nav-link">Mis créditos</Link>
      </li>
      <li className="nav-item">
        <Link to="/denied-credits" className="nav-link">Créditos negados</Link>
      </li>
      <li className="nav-item">
        <Link to="/users" className="nav-link">Usuarios</Link>
      </li>
    </ul>
  )
}

function LoggedoutNav () {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/Login" className="nav-link">Ingresar</Link>
      </li>
      <li className="nav-item">
        <Link to="/signup" className="ml-2 btn btn-primary">Empezar</Link>
      </li>
    </ul>
  )
}