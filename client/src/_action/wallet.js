import { 
    WALLET_LOADING,
    INITIAL_WALLET,
    ADDED_BALANCE_WALLET,
    DEDUCT_FROM_WALLET,
    PAYMENT_FAIL
} from './type';
import { tokenConfig } from './userAction'
import axios from 'axios'
import {returnErrors} from './errorAction.js';

export const initialWallet = () => (dispatch, getState) => {
    dispatch({ type: WALLET_LOADING })
    axios.get(`${process.env.REACT_APP_API}/getWallet`, tokenConfig(getState))
        .then(res => dispatch({
          type: INITIAL_WALLET,
          payload: res.data
        }))
        .catch(err => console.log(err))
}

export const addFund = (Amountwallet) => (dispatch, getState) => {

  const body = JSON.stringify(Amountwallet)

  axios.post(`${process.env.REACT_APP_API}/addFunds`, body, tokenConfig(getState))
    .then(res => dispatch({
      type: ADDED_BALANCE_WALLET,
      payload: res.data
    }))
    .catch(err => console.log(err))
}

export const DeductWallet = (deductWallet) => (dispatch, getState) => {

   const body = JSON.stringify(deductWallet)

  axios.post(`${process.env.REACT_APP_API}/deductFunds`, body, tokenConfig(getState))
    .then(res => dispatch({
      type: DEDUCT_FROM_WALLET,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'PAYMENT_FAIL'))
      dispatch({
        type: PAYMENT_FAIL
      })
    })
}
