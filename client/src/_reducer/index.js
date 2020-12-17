import {combineReducers} from 'redux'
import authUser from './userReducer.js'
import error from './error.js'
import kyc from './kycandbvn'
import wallet from './walletReducer'
import airtime from './airtime'
import transaction from './transaction'
import electric from './electric'
import insurance from './insurance'
import data from './data'
import verify from './verifyNumber'
import tvsub from './TvSub'

export default combineReducers({
    authUser,
    error,
    kyc,
    wallet,
    airtime,
    transaction,
    electric,
    insurance,
    data,
    verify,
    tvsub
})																								
