import React from 'react';
import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom";

export function Signup () {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const createUserOnClick = (data) => {
    const url = 'http://localhost:3500/api/user';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if (!response || !response.success) {
          alert(response.message)
          return
        }

        if (response.result && response.result.credit_line_status.name === 'approved') {
          alert('Felicitaciones!, has sido registrado exitosamente y puedes pedir créditos')
        } else if (response.result && response.result.credit_line_status.name === 'rejected') {
          alert('Has sido registrado exitosamente pero NO puedes pedir créditos, sorry :(')
        }

        history.push('/login');
      });
  }
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
            <form className="pt-3" onSubmit={handleSubmit(createUserOnClick)}>
              <div className="form-row">
                <div className="form-group col-12 col-lg-6 mb-2">
                  <label htmlFor="firstname">Primer nombre</label>
                  <input type="text" className="form-control" id="firstname" name="firstname" required
                    ref={register}
                    placeholder="Ingresa un nombre" />
                </div>
                <div className="form-group col-12 col-lg-6 mb-2">
                  <label htmlFor="lastname">Apellido</label>
                  <input type="text" className="form-control" id="lastname" name="lastname" required
                    ref={register}
                    placeholder="Ingresa un apellido" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-12 mb-2 col-md-6">
                  <label htmlFor="phone">Teléfono</label>
                  <input type="tel" className="form-control" id="phone" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" name="phone" required
                    ref={register}
                    placeholder="Ingresa tu número telefónico" />
                </div>
                <div className="form-group col-12 mb-2 col-md-6">
                  <label htmlFor="dni">Cédula</label>
                  <input type="text" className="form-control" id="dni" name="dni" required
                    ref={register}
                    placeholder="Ingresa tu número de cédula" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-12 mb-2">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" name="email" name="email" required
                    ref={register}
                    placeholder="Introduce una dirección de correo electrónico" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-12 mb-2">
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" className="form-control" id="password" name="password" name="password" required
                    ref={register}
                    placeholder="Introduce una contraseña" />
                </div>
              </div>
              <div className="form-row">
                <div className="mb-0">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" name="accept_terms" required
                        ref={register} />
                      Acepto todos los términos y condiciones
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
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