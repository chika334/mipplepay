import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      departmentName: '',
      listOfAssets: '',
      requestId: '',
      tableSoftware: []
    }
  }
  
  componentDidMount(e) {
        let newItem = this.state.tableSoftware
        const { transaction } = this.props.transaction

        newItem.push({
          transaction
        });

        this.setState({
          tableSoftware: newItem
        })
   }
  
  render() {
    const { transaction } = this.props.transaction
    console.log(this.state.tableSoftware)
    return (
      <div className="p-3">
        <div className="new" style={{ paddingBottom: '7%' }}>
          <div className="good">
              <h3>Transaction details</h3>
              {transaction.map((newItem, index) => (
                <div className="p-3 pl-4" key={index}>
                  <div className="new">
                    <p>Services: </p><p style={{ paddingLeft: '20px' }}>{newItem.product_name}</p>
                  </div>
                  <div className="new">
                    <p>Amount: </p><p style={{ paddingLeft: '20px' }}>₦{newItem.amount}</p>
                  </div>
                  <div className="new">
                    <p>Status: </p><p style={{ paddingLeft: '20px' }}>{newItem.status}</p>
                  </div>
                  <div className="new">
                    <p>Tranx NO: </p><p style={{ paddingLeft: '20px' }}>{newItem.transactionId}</p>
                  </div>
                  <div className="new">
                    <p>Date: </p><small style={{ paddingLeft: '20px' }}>{newItem.date}</small>
                  </div>
                  <div className="new">
                    <p>Total Amount Payable: </p><p style={{ paddingLeft: '20px' }}>₦{newItem.total_amount}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="cards">
            <h3>Perform other Transactions</h3>
            <div className="p-3 pl-4">
                <div className="mb-2">
                    <label>Fund wallet</label> <button className="btn btn-primary">fund</button>
                </div>
                <div className="mb-2">
                    <label>Make other payment</label> <button className="btn btn-primary">fund</button>
                </div>
                <div className="mb-2">
                    <label>Fund wallet</label> <button className="btn btn-primary">fund</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    transaction: state.transaction
})

export default withRouter(connect(mapStateToProps)(Details))
