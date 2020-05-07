import React from 'react';
import { useHistory } from "react-router-dom";

export function CreditRequestConfirm (props) {
    const history = useHistory();
  
    return (
      <div className="col-12 text-center py-4 mt-4">
        <button className="btn btn-lg btn-primary mr-2"
          onClick={(e) => {
            e.preventDefault();
  
            history.push('/signup');
          }
          }>Solicitar crédito</button>
      </div>
    )
  }