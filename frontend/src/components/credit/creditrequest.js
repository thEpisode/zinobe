import React from 'react';

import {
  CreditRequestAccounts,
  CreditRequestConfirm,
  CreditRequestAmountInput
} from './../index'

export function CreditRequest () {
  return (
    <div>
      {/* <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
      </div> */}
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
