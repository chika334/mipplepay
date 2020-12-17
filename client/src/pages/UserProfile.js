import React, { Component } from 'react'
import '../css/profile.css'
import '../css/balance.css'
import { BiWallet } from 'react-icons/bi'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'

export class UserProfile extends Component {
  render() {
    const wallet = this.props.wallet.wallet.wallet
    const {isAuthenticated} = this.props
  if(isAuthenticated=== false) return <Redirect to="/login" />
    return (
      <div className="container">
        <div className="new">
            <div className="cards" style={{ borderRadius: '20px', color: '#000' }}>
                <div className="new" style={{ padding: '30px' }}>
                    <BiWallet size={80} style={{ display: 'inline-block', borderRadius: '5px', boxShadow: '0px 0px 2px #888', padding: '0.8em 0.8em', backgroundColor: 'skyblue' }} /> 
                    <div>
                        <b>LIFETIME EARNINGS</b>
                        <p>0.00 NGN</p>
                    </div>
                </div>
                <div>
                    <b className="pl-4" >EARNINGS</b>
                    <div className="news" style={{ paddingLeft: '2px', paddingRight: '2px' }}>
                        <div>
                            <div>0.00 NGN</div>
                            <small>TODAY</small>
                        </div>
                        <div>
                            <div>0.00 NGN</div>
                            <small>THIS MONTH</small>
                        </div>
                        <div>
                            <div>0.00 NGN</div>
                            <small>LAST MONTH</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cards new" style={{ borderRadius: '20px' }}>
                <div className="new" style={{ paddingTop: 35, width: '665px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <BiWallet size={40} /> 
                    <div>
                        <b>WALLET BALANCE</b>
                        <p>{wallet} NGN</p>
                    </div>
                </div>
                <div>
                    <p>Available Payment Method</p>
                    <div className="news">Debit Cards: <p style={{ color: 'blue' }}>Available</p></div>
                    <div className="news">Bank Transfer: <p style={{ color: 'blue' }}>Available</p></div>
                     <button className="btn btn-primary"><Link style={{ color: 'white', textDecoration: 'none' }} to="/profile/wallet"><BiWallet /> Fund With Card Transfer</Link></button> 
                </div>
                </div>
            </div>
         </div>
         <div className="new">
            <div className="cards" style={{ padding: '20px', borderRadius: '20px' }}>
                <p style={{ color: "blue" }}>Recent Transaction</p>
                <div className="new" style={{ paddingLeft: '2px', paddingRight: '2px' }}>
                    <div>
                        <div className="news">0.00: <p>Transactions This Month</p></div>
                        <div className="news">0.00: <p>Transactions Last Month</p></div>
                        <button className="btn btn-primary"><Link style={{ color: 'white', textDecoration: 'none' }} to="/profile/transaction">view more</Link></button>
                    </div>
                </div>
            </div>
            <div className="cards">
                Profile
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    wallet: state.wallet,
})

export default connect(mapStateToProps, null)(UserProfile)
