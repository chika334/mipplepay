import React, { Component } from 'react';
import { Table, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { transAction } from '../_action/airtime'
import { withRouter, Redirect } from 'react-router-dom'

class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      departmentName: '',
      listOfAssets: '',
      requestId: '',
      tableSoftware: []
    }
  }

  static propTypes = {
    data: PropTypes.object.isRequired
  }
  
  /*componentDidMount(e) {
        let newItem = this.state.tableSoftware
        const { credit } = this.props.airtime
        const { data } = this.props.data

        newItem.push({
          credit,
          data
        });

        console.log(this.props)
        this.setState({
          tableSoftware: newItem
        })
   }*/
   
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


    handleClick = (props) => {
        const trans = props.id 
        const value = {
            trans,
        }
        this.props.transAction(value)

        this.props.history.push({
            pathname: '/details',
            search: '?query=abc',
            state: { detail: { value } }
        })
    }

  render() {
    const { transaction } = this.props.transaction
    const {isAuthenticated} = this.props
  if(isAuthenticated=== false) return <Redirect to="/login" /> 
    return (
      <section>
        <header>
          <h1 align="center">Transactions</h1>
        </header>
        <div>
          <div>
            <Container>
              <Table striped bordered responsive hover size="sm">
                  <thead>
                    <tr>
                      <th>Services</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Tranx NO / Token</th>
                      <th></th>
                    </tr>
                  </thead>
                <tbody>
                  {transaction.map((newItem, index) => (
                    <tr key={index}>
                      <td>{newItem.product_name}</td>
                      <td>{newItem.amount}</td>
                      <td>{newItem.status}</td>
                      <td>{newItem.transactionId}<br /><small>{newItem.date}</small></td>
                      <td><button  onClick={() => this.handleClick({id: newItem.requestId})} className="btn btn-primary">see all</button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
    transaction: state.transaction,
    isAuthenticated: state.authUser.isAuthenticated,
})

export default withRouter(connect(mapStateToProps, { transAction })(Transaction))
