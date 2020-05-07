import React from 'react';;

export function Login () {
  const date = new Date();

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
              <form className="pt-3">

                <div className="form-group">
                  <label htmlFor="input-username">Usuario</label>
                  <div className="input-group">
                    <div className="input-group-prepend bg-transparent">
                      <span className="input-group-text bg-transparent border-right-0">
                        <i className="mdi mdi-account-outline text-primary"></i>
                      </span>
                    </div>
                    <input className="form-control border-left-0" type="text" id="input-username" required
                      /* v-model="vueBind.model.identity" */
                      /* {...{ 'v-on:keyup.enter': 'loginOnClick($event)' }} */
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
                    <input id="input-password" type="password" className="form-control border-left-0"
                      /* v-model="vueBind.model.password" */
                      /* {...{ 'v-on:keyup.enter': 'loginOnClick($event)' }} */
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
                  <button type="button" className="btn btn-block btn-primary font-weight-medium auth-form-btn text-uppercase"
                /* {...{ 'v-on:click': 'loginOnClick($event)' }} */>Login</button>
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