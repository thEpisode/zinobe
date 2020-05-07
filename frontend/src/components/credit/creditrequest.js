import React from 'react';

import {
  CreditRequestAccounts,
  CreditRequestConfirm,
  CreditRequestAmountInput
} from './../index'

export function CreditRequest () {
  return (
    <div>
      {/* Basic info for request */}
      <form className="mt-5 mb-3">
        <div className="row">

          {/* Request panel */}
          <CreditRequestAmountInput />

          {/* Credit Accounts */}
          <CreditRequestAccounts />

          {/* Request credit button */}
          <CreditRequestConfirm />
        </div>

      </form>
    </div>
  );
}
