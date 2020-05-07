import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  incrementByAmount,
  selectCount,
} from './../../features/credit/counterSlice';
import noUiSlider from 'nouislider/distribute/nouislider.min.js';

export function CreditRequestAmountInput(props) {
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