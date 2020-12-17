import axios from 'axios'
import {
	TVSUB_VERIFY_LOADED, TVSUB_VERIFY_LOADING, PAY_TVBILL, PAY_TVBILL_FAIL
} from './type.js';
import {returnErrors} from './errorAction.js';
import { tokenConfig } from './userAction'

export const getverifySmartcardNumber = () => (dispatch, getState) => {
  dispatch({ type: TVSUB_VERIFY_LOADING })
  axios.get(`${process.env.REACT_APP_API}/getverifySmartcardNumber`, tokenConfig(getState))
    .then(res => dispatch({
      type: TVSUB_VERIFY_LOADED,
      payload: res.data
    }))
    .catch(err => console.log(err))
}

export const payTvBill = (value) => (dispatch, getState) => {
  const body = JSON.stringify(value)

  axios.post(`${process.env.REACT_APP_API}/payTvBill`, body, tokenConfig(getState))
    .then(res => dispatch({
      type: PAY_TVBILL,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'PAY_TVBILL_FAIL'))
      dispatch({
        type: PAY_TVBILL_FAIL
      })
    })
}
