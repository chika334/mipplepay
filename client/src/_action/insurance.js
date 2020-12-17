import { 
    INSURANCE_PAY,
} from './type';
import { tokenConfig } from './userAction'
import axios from 'axios'
import {returnErrors} from './errorAction.js';

export const insurance = (Amountwallet) => (dispatch, getState) => {

  const body = JSON.stringify(Amountwallet)

  axios.post(`${process.env.REACT_APP_API}/insurance`, body, tokenConfig(getState))
    .then(res => dispatch({
      type: INSURANCE_PAY,
      payload: res.data
    }))
    .catch(err => console.log(err))
}
