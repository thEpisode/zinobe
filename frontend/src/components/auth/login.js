import React from 'react';
import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedin } from './../../app/actions/user.action'

export function Login () {
  const cookies = new Cookies();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const date = new Date();
  const dispatch = useDispatch();

  const loginOnClick = (data) => {
    const url = 'http://localhost:3500/api/login';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if (!response || !response.success || response.result.auth !== true) {
          alert(response.message)
          return
        }

        dispatch(setLoggedin(true))
        cookies.set('user_session', response.result.token, { expires: new Date(response.result.payload.session_time), path: '/' });
        cookies.set('user_identity', response.result.payload.identity, { expires: new Date(response.result.payload.session_time), path: '/' });
        cookies.set('credit_line', response.result.payload.creditLine, { expires: new Date(response.result.payload.session_time), path: '/' });

        history.push('/request-credit');
      });
  }

  return (

    <div className="h-100">
      <div className="auth auth-img-bg pattern-bg h-100">
        <div className="row flex-grow m-0 flex-nowrap h-100">
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="auth-form-light text-left p-4 shadow">
              <div className="brand-logo">
                <img src="/logo512.png" alt="logo" height="50" />
              </div>
              <h4>Bienvenido!</h4>
              <h6 className="font-weight-light">Nos alegra tenerte de vuelta!</h6>
              <form className="pt-3" onSubmit={handleSubmit(loginOnClick)}>

                <div className="form-group">
                  <label htmlFor="input-username">Usuario</label>
                  <div className="input-group">
                    <div className="input-group-prepend bg-transparent">
                      <span className="input-group-text bg-transparent border-right-0">
                        <i className="mdi mdi-account-outline text-primary"></i>
                      </span>
                    </div>
                    <input className="form-control border-left-0" type="text" id="input-username" name="identity" required
                      ref={register}
                      placeholder="Teléfono, DNI o email" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="input-password">Contraseña</label>
                  <div className="input-group">
                    <div className="input-group-prepend bg-transparent">
                      <span className="input-group-text bg-transparent border-right-0">
                        <i className="mdi mdi-lock-outline text-primary"></i>
                      </span>
                    </div>
                    <input id="input-password" type="password" className="form-control border-left-0" name="password" required
                      ref={register}
                      placeholder="Tu contraseña" />
                  </div>
                </div>

                <div className="my-2 d-flex flex-column">
                  <div>
                    <a href="#" className="auth-link text-black">¿Olvidaste tu nombre de usuario?</a>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                  Mantenme conectado
                </label>
                  </div>
                </div>
                <div className="my-3">
                  <button className="btn btn-block btn-primary font-weight-medium auth-form-btn text-uppercase">
                    Ingresar
                  </button>
                </div>

                <div className="text-center mt-4 font-weight-light">
                  ¿Aún no tienes cuenta? <a href="/signup" className="text-primary">Crea tu cuenta aquí</a>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6 login-half-bg d-flex flex-row">
            <p className="text-white font-weight-medium text-center flex-grow align-self-end">Some legal information. <a href="#" target="_blank" className="text-white">Corporate</a> Copyright &copy; {date.getFullYear()}  All rights reserved.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
