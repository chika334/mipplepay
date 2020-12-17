import React, { Component } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { BiWallet } from 'react-icons/bi'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { DeductWallet } from '../_action/wallet'
import {clearErrors} from '../_action/errorAction'
import {Alert} from 'react-bootstrap'
import { BuyCreditFund } from '../_action/airtime'
import { payElectricBill } from '../_action/electric'
import { BuyData } from '../_action/data'
import { payTvBill } from '../_action/TvsubAction'

export class Paid extends Component {
  constructor(props) {
    super(props)
    this.state = {
        deduct: null,
        msg: null,
        redirect: false,
        naira: '₦',
        deafultValue: 100
    }
  }

  static propType = {
    wallet: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    BuyCreditFund: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }
  
  componentDidUpdate(prevProps) {
    const {error} = this.props
    if (error !== prevProps.error) {
      // check for register error
      if (error.id === 'PAYMENT_FAIL') {
        this.setState({msg: error.msg.msg})
      } else {
        this.setState({msg: null})
      }
      return
    }
  }

  sendRedirect = () => {
    this.props.clearErrors()
  }
  
  transaction = () => {
    const name = `${this.props.location.state.detail.name}`
    const amount = `${this.props.location.state.detail.amount}`
    const service = `${this.props.location.state.detail.service}`
    const phone = `${this.props.location.state.detail.phone}`
    const select = `${this.props.location.state.detail.select}`
    
    const AmountInt = parseInt(amount, 10)
    
    const value = {
        name,
        AmountInt,
        service,
        phone,
        select
    }

    this.props.BuyCreditFund(value)
  }
  
  data = () => {
    const name = `${this.props.location.state.detail.name}`
    const amount = `${this.props.location.state.detail.amount}`
    const service = `${this.props.location.state.detail.service}`
    const phone = `${this.props.location.state.detail.phone}`
    const select = `${this.props.location.state.detail.select}`
    const variation = `${this.props.location.state.detail.variation}`
    
    const AmountInt = parseInt(amount, 10)
    
    console.log(service)
    
    const value = {
        name,
        AmountInt,
        service,
        phone,
        select,
        variation
    }

    this.props.BuyData(value)
  }
  
  TvSub = () => {
    const name = `${this.props.location.state.detail.name}`
    const service = `${this.props.location.state.detail.service}`
    const smartcard = `${this.props.location.state.detail.smartcard}`
    const amount = `${this.props.location.state.detail.amount}`
    const phone = `${this.props.location.state.detail.phone}`
    const select = `${this.props.location.state.detail.select}`
    
    const AmountInt = parseInt(amount, 10)
    
    const value = {
        name,
        AmountInt,
        service,
        phone,
        select,
        smartcard
    } 

    this.props.payTvBill(value)
  }
  
  ElectricBill = () => {
    const name = `${this.props.location.state.detail.name}`
    const amount = `${this.props.location.state.detail.amount}`
    const service = `${this.props.location.state.detail.service}`
    const phone = `${this.props.location.state.detail.phone}`
    const select = `${this.props.location.state.detail.select}`
    const meter = `${this.props.location.state.detail.meter}`
    
    const AmountInt = parseInt(amount, 10)
    
    const value = {
        name,
        AmountInt,
        service,
        phone,
        select,
        meter
    }
    
    this.props.payElectricBill(value)
  }
  
  PayWithWallet = () => {
    const name = this.props.location.state.detail.name
    const amount = this.props.location.state.detail.amount
    
    const AmountInt = parseInt(amount, 10)
    
    if (name === "Third Party Motor Insurance - Universal Insurance" || name === "Health Insurance - HMO  " || name === "Personal Accident Insurance" || name === "Home Cover Insurance") {
        this.sendDetails()
    } else if (name === "DSTV Subscription" || name === "Gotv Payment" || name === "Startimes Subscription") {
        this.TvSub()
    } else if (name === "Airtel Airtime VTU" || name === "MTN Airtime VTU" || name === "GLO Airtime VTU" || name === "9mobile Airtime VTU" || name === "9Mobile Airtime Pin") {
        this.transaction()
    } else if (name === "Airtel Data" || name === "MTN Data" || name === "GLO Data" || name === "9mobile Data" || name === "Smile Payment") {
        this.data()
        //console.log("Data")
    } else if (name === "Ikeja Electric Payment - IKEDC" || name === "Eko Electric Payment - EKEDC" || name === "Abuja Electricity Distribution Company- AEDC" || name === "KEDCO - Kano Electric" || name === "PHED - Port Harcourt Electric" || name === "Jos Electric - JED" || name === "IBEDC - Ibadan Electricity Distribution Company") {
        this.ElectricBill()
    }
 
    // clear errors
    this.sendRedirect();

    const deductWallet = {
        AmountInt
    }
    this.props.DeductWallet(deductWallet);

    // Add paystack login here
  }

  PayWithCard =() => {
    let name = this.props.location.state.detail.name
    let amount = this.props.location.state.detail.amount
    const AmountInt = parseInt(amount, 10)
    this.props.history.push({
        pathname: '/card',
        search: '?query=abc',
        state: { detail: { name, AmountInt } }
    })
  }

  render() {
  const {isAuthenticated} = this.props
  if(isAuthenticated=== false) return <Redirect to="/login" /> 
  const wallet = this.props.wallet.wallet.wallet
  const {name} = this.props.location.state.detail
  const amount = this.props.location.state.detail.amount
  const AmountInt = parseInt(amount, 10)
  const addAmount = AmountInt + this.state.deafultValue
  const normal = AmountInt + 0
 // console.log(addAmount)
    return (
      <div className="container pt-5">
        <div className="cards new" style={{ borderRadius: '20px' }}>
            <div>
                <button style={{ backgroundColor: 'Transparent', backgroundRepeat: 'no-repeat', border: '1px solid grey', borderRadius: '3px' }} className="nav-link" href="/help"><Link style={{ textDecoration: 'none' }} to="/profile/wallet"><BiWallet />Wallet: ₦{wallet}</Link></button>
            </div>
            <div>
                <h3>Please Confirm your Transaction Details are as Follows:</h3>
                {this.state.msg ? <Alert variant="danger">{this.state.msg}</Alert> : null}
                <div className="cards bg-light" style={{  padding: '10px', borderRadius: '10px',  }}>
                <p style={{ width: '100%' }}>TRANSACTION INFO:</p>
                    
                    {
                        name === "Ikeja Electric Payment - IKEDC" || name === "Eko Electric Payment - EKEDC" || name === "Abuja Electricity Distribution Company- AEDC" || name === "KEDCO - Kano Electric" || name === "PHED - Port Harcourt Electric" || name === "Jos Electric - JED" || name === "IBEDC - Ibadan Electricity Distribution Company" ? 
                        <>
                            <div className="new">
                                <p>Customer Name: </p><p style={{  paddingLeft: '30px' }}>{this.props.location.state.detail.verifyCustomerName}</p>
                            </div>
                            <div className="new">
                                <p>Address: </p><p style={{  paddingLeft: '30px' }}>{this.props.location.state.detail.verifyAddress}</p>
                            </div>
                        </>
                        : ""
                    }
                    {
                        name === "DSTV Subscription" || name === "Gotv Payment" || name === "Startimes Subscription" ? 
                        <>
                            <div className="new">
                                <p>Customer Name: </p><p style={{  paddingLeft: '30px' }}>{this.props.location.state.detail.verifyCustomerName}</p>
                            </div>
                        </>
                        : ""
                    }
                    <div className="new">
                        <p>Product: </p><p style={{  paddingLeft: '30px' }}>{this.props.location.state.detail.name}</p>
                    </div>
                    <div className="new">
                        <p>Phone: </p><p style={{  paddingLeft: '30px' }}>{this.props.location.state.detail.phone}</p>
                    </div>
                    <div className="new">
                        <p>Amount: </p><p style={{  paddingLeft: '30px' }}>{
                            name === "DSTV Subscription" || name === "Gotv Payment" || name === "Startimes Subscription" ?
                            <>
                                 {this.state.naira}{this.props.location.state.detail.amount} + {this.state.naira}{this.state.deafultValue}
                            </> : <>{normal}</>
                        }</p>
                    </div>
                    <div className="new">
                        <p>Total Payable Amount: </p><p style={{  paddingLeft: '30px' }}>{
                            name === "DSTV Subscription" || name === "Gotv Payment" || name === "Startimes Subscription" ?
                            <>
                                 {this.state.naira}{addAmount}
                            </> : <>{normal}</>
                        }</p>
                    </div>
                    <div className="new">
                        <p>Email: </p><p style={{  paddingLeft: '20px' }}>{this.props.location.state.detail.email}</p>
                    </div>
                    <div className="new">
                        <p>Status: </p><p style={{  paddingLeft: '20px' }}>initiated</p>
                    </div>
                </div>
                <div className="new p-3">
                    <button className="btn btn-primary m-3" onClick={this.PayWithWallet} >Pay with wallet</button>
                    <button className="btn btn-primary m-3" onClick={this.PayWithCard}>Pay with card</button>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authUser.isAuthenticated,
    wallet: state.wallet,
    error: state.error
})

export default withRouter(connect(mapStateToProps, { DeductWallet, clearErrors, BuyCreditFund, payElectricBill, BuyData, payTvBill })(Paid))
