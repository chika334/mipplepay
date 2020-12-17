import { 
    DATA_PAY,
    DATA_LOADED,
    DATA_LOADING,
    DATA_ERROR
} from './type';
import { tokenConfig } from './userAction'
import axios from 'axios'
import {returnErrors} from './errorAction.js';

export const dataTransaction = () => (dispatch, getState) => {
  dispatch({ type: DATA_LOADING })
  axios.get(`${process.env.REACT_APP_API}/dataTransaction`, tokenConfig(getState))
    .then(res => dispatch({
      type: DATA_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: DATA_ERROR
      })
    })
}

export const BuyData = (value) => (dispatch, getState) => {
  const body = JSON.stringify(value)

  axios.post(`${process.env.REACT_APP_API}/DataTransaction`, body, tokenConfig(getState))
    .then(res => dispatch({
      type: DATA_PAY,
      payload: res.data
    }))
    .catch(err => console.log(err))
}
