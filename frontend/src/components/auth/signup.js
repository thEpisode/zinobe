import React from 'react';;

export function Signup () {
  return (
    <div className="w-100 my-5 py-5">
      <div className="col-12 col-lg-9 mx-auto">
        <div className="auth-form-light d-flex p-4 shadow">
          <div className="col-12 col-md-6 p-4">
            <div className="brand-logo">
              <img src="/logo512.png" alt="logo" height="50" />
            </div>
            <h3 className="">Crea tu cuenta</h3>
            <h6 className="font-weight-light">para continuar a Zinobe.</h6>
            <form className="pt-3">
              <div className="form-row">
                <div className="form-group col-12 col-lg-6 mb-2">
                  <label htmlFor="firstname">Primer nombre</label>
                  <input type="text" className="form-control" id="firstname" required
                    /* v-model="vueBind.model.user.firstname" */
                    placeholder="Ingresa un nombre" />
                </div>
                <div className="form-group col-12 col-lg-6 mb-2">
                  <label htmlFor="lastname">Apellido</label>
                  <input type="text" className="form-control" id="lastname" required
                    /* v-model="vueBind.model.user.lastname" */
                    placeholder="Ingresa un apellido" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-12 mb-2">
                  <label htmlFor="phone">Teléfono</label>
                  <input type="tel" className="form-control" id="phone" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" required
                    /* v-model="vueBind.model.user.phone" */
                    placeholder="Ingresa tu número telefónico" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-12 mb-2">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" name="email" required
                    /* v-model="vueBind.model.user.email" */
                    placeholder="Introduce una dirección de correo electrónico" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-12 mb-2">
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" className="form-control" id="password" name="password" required
                    /* v-model="vueBind.model.user.password" */
                    placeholder="Introduce una contraseña" />
                </div>
              </div>
              <div className="form-row">
                <div className="mb-0">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" required
                        /* v-model="vueBind.model.user.accept_terms" */ />
                      Acepto todos los términos y condiciones
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  /* {...{ 'v-on:click': 'createUserOnClick($event)' }} */>
                  Empezar
                </button>
              </div>
              <div className="text-center mt-4 font-weight-light">
              ¿Ya tienes cuenta?
                <a href="/login" className="text-primary ml-2">Inicia sesión</a>
              </div>
            </form>
          </div>
          <div className="col-6 p-4 align-items-center justify-content-center d-none d-md-flex">
            <div>
              <picture>
                <source type="image/webp" srcSet="/auth/register-bg-2.webp" />
                <img className="w-100" src="/auth/register-bg-2.jpg" alt="Zinobe register banner" />
              </picture>
              <h6 className="font-weight-light text-center">Una cuenta para mejorar tus finanzas.</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}