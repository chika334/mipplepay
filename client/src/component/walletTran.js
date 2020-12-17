import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import moment from "moment";
import wallet from '../images/wallet.jpg';
import { Jumbotron, Button, Card } from 'react-bootstrap'

export class walletTran extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  addFund = (e) => {
    e.preventDefault()
    
    const AmountInt = this.props.location.state.detail.AmountInt
    
    this.props.history.push({
        pathname: '/card',
        search: '?query=abc',
        state: { detail: { AmountInt } }
    })
  }
  
  render() {
  const {isAuthenticated} = this.props
  if(isAuthenticated === false) return <Redirect to="/login" /> 
    return (
        <Jumbotron className="container">
            <div className="new">
            <Card>
                <Card.Body>                                                      
                  <table width="100%" height="80%">
              	    <tbody>
                  	    <tr>
                  	        <td>Payment Method</td>
                  	        <td disabled style={{ border: '1px solid black', padding: '5px' }}>Online</td>
                  	    </tr>
                  	    <tr>
                  	        <td>Transaction ID</td>
                  	        <td style={{ border: '1px solid black' }}>{this.props.location.state.detail.transactionID}</td>
                  	    </tr>
                  	    <tr>
                  	        <td>Amount</td>
                  	        <td style={{ border: '1px solid black', padding: '5px' }}>{this.props.location.state.detail.AmountInt} + ₦0  (Convenience Fee) </td>
                  	    </tr>
                  	    <tr>
                  	        <td>Total Amount Payable</td>
                  	        <td style={{ border: '1px solid black', padding: '5px' }}>{this.props.location.state.detail.AmountInt}</td>
                  	    </tr>
                  	    <tr>
                  	        <td>KYC and BVN Info</td>
                  	        <td style={{ border: '1px solid black', padding: '5px' }}>
                  	           {moment().format('YYYY-MM-DD HH:mm:ss')}
                  	        </td>
                  	    </tr>       
              	    </tbody>
              	</table>
                  <Button onClick={this.addFund}>Confirm</Button>
                </Card.Body>
              </Card>
          	
          	  <Card width="100%">
                <Card.Img src={wallet} alt="Card image cap" />
              </Card>
          </div>
      </Jumbotron>
      
    )
  }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authUser.isAuthenticated
})

export default withRouter(connect(mapStateToProps)(walletTran))
