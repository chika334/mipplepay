import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Data from '../component/Data'
import Tvsub from '../component/Tvsub'
//import Insurance from '../component/insurance'
import Credit from '../component/credit'
import Nepa from '../component/nepa'

export class Payment extends Component {
  render() {
  const {isAuthenticated} = this.props
  if(isAuthenticated=== false) return <Redirect to="/login" />
    return (
      <div className="p-5 pt-5">
      	<div>
      	<h3 className="pt-3"><b>Payment</b></h3>
      	<p>Select the service you want to make payment for</p>
      	<h4>Airtime Recharge</h4>
      	<div className="new">
      	    <Credit />
      	</div>
      	</div>

      	<div>
      	    <h4>Data Services</h4>
          	<div className="new">
          	    <Data />
            </div>
      	</div>

      	<div>
      	    <h4>TV Subscription</h4>
          	<div className="new">
          	    <Tvsub />
            </div>
         </div>
         
         <div>
      	    <h4>Electricity bill</h4>
          	<div className="new">
          	    <Nepa />
            </div>
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authUser.isAuthenticated,
})

export default connect(mapStateToProps, null)(Payment)
