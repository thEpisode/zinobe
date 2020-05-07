import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './counterSlice';
import styles from './Credit.module.css';
import $ from 'jquery';
import noUiSlider from 'nouislider/distribute/nouislider.min.js';

const Accounts = (props) => {
  const count = useSelector(selectCount);

  const round = (value, precision) => {
    if (isNaN(value)) {
      return 0
    }

    const multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
  }

  const formatPrice = (value, precision) => {
    if (!value) {
      return 0
    }
    // Cast to string
    value = value + ''
    // Remove the $ symbol and commas
    const rawNum = value.replace(/[$,]/g, '')
    // Get precision
    const decimalNum = round(Number(value), precision || 2) + ''
    // Separate nums and decimals
    const nums = decimalNum.split('.')
    // Get nums separated by hundreds
    const num = nums.length > 1 ? nums[0].split(/(?=(?:...)*$)/).join(',') : rawNum.split(/(?=(?:...)*$)/).join(',')
    if (rawNum.length > 0) {
      // if has decimals
      if (nums.length > 1) {
        const decimals = nums[1]
        // Format num and decimals
        return `${num}.${decimals}`
      }
    }
    return num
  }

  return (
    <div className="col-12 col-md-6">
      <h6 className="text-center">Nos gustan las cuentas claras, valores a pagar</h6>

      <div className="card bg-gray-light border-0">
        <div className="card-body py-3">
          <ul className="list-unstyled mb-0">
            <li className="d-flex justify-content-center row">
              <div className="col-6 text-right pr-3"><span>Valor solicitado</span></div>
              <div className="col-6 text-left font-weight-bold pl-3 text-dark"><span>${formatPrice(count)}</span> </div>
            </li>
            <li className="d-flex justify-content-center row">
              <div className="col-6 text-right pr-3"><span>Interés (25% E.A.)</span></div>
              <div className="col-6 text-left pl-3 d-flex justify-content-between">
                <span>$0</span>
              </div>
            </li>
            <li className="d-flex justify-content-center row">
              <div className="col-6 text-right pr-3"><span>Seguro</span></div>
              <div className="col-6 text-left pl-3 d-flex justify-content-between">
                <span>$0</span>
              </div>
            </li>
            <li className="d-flex justify-content-center row">
              <div className="col-6 text-right pr-3"><span>Administración</span></div>
              <div className="col-6 text-left pl-3 d-flex justify-content-between">
                <span>$0</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="card bg-light border-0">
        <div className="card-body py-3">
          <ul className="list-unstyled mb-0">
            <li className="d-flex justify-content-center row">
              <div className="col-6 text-right pr-3 font-weight-bold pl-3 text-dark"><span>Sub Total</span></div>
              <div className="col-6 text-left pl-3"><span>${formatPrice(count)}</span></div>
            </li>
            <li className="d-flex justify-content-center row">
              <div className="col-6 text-right pr-3"><span>IVA</span></div>
              <div className="col-6 text-left pl-3"><span>$0</span></div>
            </li>
          </ul>
        </div>
      </div>
      <div className="card bg-gray-light border-0">
        <div className="card-body py-2">
          <ul className="list-unstyled">
            <li className="d-flex justify-content-center row">
              <div className="col-6 text-right pl-0 pr-3">
                <span className="h6 text-dark">TOTAL</span>
              </div>
              <div className="col-6 pl-3 pr-0">
                <span className="h6 text-dark">${formatPrice(count)}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const ConfirmButton = (props) => {
  return (
    <div className="col-12 text-center py-4 mt-4">
      <button className="btn btn-lg btn-primary mr-2"
        onClick={(e) => {
          console.log('Cliiick')
          e.preventDefault()
        }
        }>Solicitar crédito</button>
    </div>
  )
}

const CreditInput = (props) => {
  const standardValue = 500000;
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(standardValue);

  useEffect(() => {
    dispatch(incrementByAmount(Number(standardValue) || 0))
    const softSlider = document.querySelector('#credit-slider')
    const settings = {
      start: [standardValue],
      step: 10000,
      tooltips: true,
      connect: true,
      range: {
        min: 0,
        max: 1000000
      },
      format: {
        // 'to' the formatted value. Receives a number.
        to: function (value) {
          return '$' + value
        },
        // 'from' the formatted value.
        // Receives a string, should return a number.
        from: function (value) {
          return value
        }
      },
      pips: {
        mode: 'values',
        values: [0, 500000, 1000000],
        density: 100000
      }
    }

    const slider = noUiSlider.create(softSlider, settings)
    slider.on('change', (values) => {
      const value = +(values[0].slice(1, values[0].length))
      if (value > 0) {
        dispatch(incrementByAmount(Number(value) || 0))
        setIncrementAmount(Number(value))
      }
    })
  }, []);

  return (
    <div className="col-12 col-md-6 pr-5">
      <div className="form-row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="">¿Cuánto necesitas?</label>
            <input className="form-control" type="number" name="" id="" min="0" max="10000000" step="10000"
              value={incrementAmount}
              onChange={e => dispatch(incrementByAmount(Number(incrementAmount) || 0))} />
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="col-12 mt-5 pt-4 mx-auto">
          <div id="credit-slider" className="ul-slider slider-primary mb-5"></div>
        </div>
      </div>
    </div>
  )
}

export function Credit() {



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
          <CreditInput />

          {/* Accounts */}
          <Accounts />

          {/* Reques credit button */}
          <ConfirmButton />
        </div>

      </form>
    </div>
  );
}
