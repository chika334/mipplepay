import axios from 'axios'
import {
	VERIFY_LOADED, PAY_ELECTRIC, ELECTRIC_PAYMENT_FAIL, VERIFY_LOADING, POST_PAY_ELECTRIC
} from './type.js';
import {returnErrors} from './errorAction.js';
import { tokenConfig } from './userAction'

// verify meter number 
export const NumberverifyTransaction = () => (dispatch, getState) => {
  dispatch({ type: VERIFY_LOADING })
  axios.get(`${process.env.REACT_APP_API}/verifyNumber`, tokenConfig(getState))
    .then(res => dispatch({
      type: VERIFY_LOADED,
      payload: res.data
    }))
    .catch(err => console.log(err))
}

export const payElectricBill = (value) => (dispatch, getState) => {
  const body = JSON.stringify(value)

  axios.post(`${process.env.REACT_APP_API}/prepaidMeterPayment`, body, tokenConfig(getState))
    .then(res => dispatch({
      type: PAY_ELECTRIC,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'ELECTRIC_PAYMENT_FAIL'))
      dispatch({
        type: ELECTRIC_PAYMENT_FAIL
      })
    })
}

export const postPayElectricBill = (value) => (dispatch, getState) => {
  const body = JSON.stringify(value)

  axios.post(`${process.env.REACT_APP_API}/postpaidMeterPayment`, body, tokenConfig(getState))
    .then(res => dispatch({
      type: POST_PAY_ELECTRIC,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'ELECTRIC_PAYMENT_FAIL'))
      dispatch({
        type: ELECTRIC_PAYMENT_FAIL
      })
    })
}
