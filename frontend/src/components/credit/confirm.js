import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectIsLoggedin } from './../../app/reducers/user.reducer'
import { selectCount } from './../../features/credit/counterSlice';
import Cookies from 'universal-cookie';

export function CreditRequestConfirm (props) {
  const cookies = new Cookies();
  const history = useHistory();
  const userId = cookies.get('user_identity');
  const creditLine = cookies.get('credit_line');
  const jwt = cookies.get('user_session');
  const isLoggedin = useSelector(selectIsLoggedin);
  const amountRequested = useSelector(selectCount);

  const requestCreditOnClick = (e) => {
    e.preventDefault();

    if (!isLoggedin) {
      history.push('/signup');
      return
    }

    createCredit();
  }

  const createCredit = () => {
    const url = 'http://localhost:3500/api/credit';
    const data = {
      userId,
      amount_requested: amountRequested
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': jwt || ''
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if (!response || !response.success) {
          alert(response.message)
          return
        }

        if (response.result && response.result.status.name === 'rejected') {
          alert('Lo sentimos, no podemos prestarte dinero :(')
          return
        }

        history.push('/my-credits');
      });
  }

  return (
    <div className="col-12 text-center py-4 mt-4">
      <button className="btn btn-lg btn-primary mr-2"
        onClick={requestCreditOnClick}>Solicitar crédito</button>
    </div>
  )
}