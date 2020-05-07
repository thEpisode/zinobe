import React from 'react';
import { CreditRequest } from './../index';

export function Home () {
  return (
    <div className="container">
      <div className="mt-5 pt-5">
        <h1 className="h2 text-center">Créditos Zinobe</h1>
        <CreditRequest />
      </div>
    </div>
  );
}