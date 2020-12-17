import React, { useState } from "react"
import { PaystackButton } from "react-paystack"
import "../css/card.css"
import creditcard from '../images/creditcard.jpg'
import { connect } from 'react-redux'
import { addFund } from '../_action/wallet'

const CreditCard = (props) => {
  const publicKey = `${process.env.REACT_APP_PAYSTACK}`
  const amount = `${props.location.state.detail.AmountInt}`
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Fund Account",
    onSuccess: () => {
      setEmail("")
      setName("")
      setPhone("")
      
      // add to wallet
      props.addFund(amount)
    },
    onClose: () => alert("Please Wait! You need fund your account!!!!"),
  }

  return (
    <div className="App">
      <div className="containers">
        <div className="item">
          <div className="overlay-effect"></div>
          <img
            className="item-image"
            src={creditcard}
            alt="may payment"
          />
          <div className="item-details">
            <p className="item-details__title">{props.location.state.detail.name}</p>
            <p className="item-details__amount">NGN {amount}</p>
          </div>
        </div>
        <div className="checkout">
          <div className="checkout-form">
            <div className="checkout-field">
              <label>Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="checkout-field">
              <label>Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="checkout-field">
              <label>Phone</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <PaystackButton className="paystack-button" {...componentProps} />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.authUser.isAuthenticated,
})

export default connect(mapStateToProps, {addFund})(CreditCard)
