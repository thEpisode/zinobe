import React from 'react';
import {
  Link
} from "react-router-dom";

export function Nav () {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <Link to="/" className="navbar-brand">Zinobe</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse">
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
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/Login" className="nav-link">Ingresar</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="ml-2 btn btn-primary">Empezar</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}