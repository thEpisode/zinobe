import React from 'react';
import { useSelector } from 'react-redux';
import { selectCount } from './../../features/credit/counterSlice';

export function CreditRequestAccounts (props) {
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