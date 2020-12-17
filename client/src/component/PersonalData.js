import React, { Component } from 'react'
import { connect } from 'react-redux'
import { kycandbvn } from '../_action/kyc'
import PropTypes from 'prop-types'
import BusinessInfo from './BusinnessInfo'
import {Alert} from 'react-bootstrap'

export class PersonalData extends Component {
  state = {
    id: '',
    firstname: '',
    middlename: '',
    lastname: '',
    gender: '',
    birthday: '',
    bvn: '',
    bvnphone: '',
    msg: ''
  }
  
  static propTypes = {
    kycandbvn: PropTypes.func.isRequired,
    kyc: PropTypes.object.isRequired
  }
  
  handleSelect = (e) => {
    //console.log('Selected value:', e.target.value);
    this.setState({ gender: e.target.value })
  }
  
  handleChange = (e) => {
    const id = this.props.authUser.user._id
    this.setState({ id: id })
    const { name, value } = e.target
    this.setState({ [name]:value })
  }
  
  handleBirthdayChange = e => {
    const { value } = e.target
    this.setState({ birthday: value })
    //console.log(value)
  }

  openModal = () => {
    document.getElementById('id01').style.display='block'
  }
  
  hideModal = () => {
    document.getElementById('id01').style.display='none'
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    const { id, firstname, middlename, lastname, birthday, bvn, bvnphone } = this.state;
    const details = { id, firstname, middlename, lastname, birthday, bvn, bvnphone }
    //console.log(this.state)
    this.props.kycandbvn(details)
  }
  
  render() {
  const {email, name} = this.props.authUser.user
  console.log(this.state.msg)
    return (
      <div>
      	<table style={{ width: '100%' }}>
      	    <tbody>
          	    <tr>
          	        <td>Name</td>
          	        <td disabled style={{ border: '1px solid black', padding: '10px' }}>{name}</td>
          	    </tr>
          	    <tr>
          	        <td>Account Type</td>
          	        <td style={{ border: '1px solid black', padding: '10px' }}>Regular</td>
          	    </tr>
          	    <tr>
          	        <td>Email</td>
          	        <td style={{ border: '1px solid black', padding: '10px' }}>{email}</td>
          	    </tr>
          	    <tr>
          	        <td>Phone</td>
          	        <td style={{ border: '1px solid black', padding: '10px' }}>Regular</td>
          	    </tr>
          	    <tr>
          	        <td>KYC and BVN Info</td>
          	        <td style={{ border: '1px solid black', padding: '10px' }}>
          	           <button onClick={this.openModal} className="btn btn-primary">View KYC and BVN info</button>
          	        </td>
          	    </tr> 
          	    <tr>
          	        <td>Business Info</td>
          	        <td style={{ border: '1px solid black', padding: '10px' }}>
          	           <BusinessInfo/>
          	        </td>
          	    </tr>        
      	    </tbody>
      	</table>
      	<div style={{ width: '100%', overflowY: 'scroll' }} id="id01" className="modal">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                  <header className="container"> 
                    <button onClick={this.hideModal} 
                    className="close">&times;</button>
                    <h5>KYC Info</h5>
                  </header>
                  {this.props.kyc.msg === null ? "" : <Alert variant="success">{this.props.kyc.msg.msg}</Alert>}
                  <div className="modal-body">
                    <div className="container">
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <p>First Name</p>
                                <input 
                                    type="text"
                                    onChange={this.handleChange}
                                    name="firstname"
                                    value={this.state.firstname}
                                />
                            </div>
                            
                            <div>
                                <p>Middle Name</p>
                                <input 
                                    type="text"
                                    onChange={this.handleChange}
                                    name="middlename"
                                    value={this.state.middlename}
                                />
                            </div>
                            
                            <div>
                                <p>Last Name</p>
                                <input 
                                    type="text"
                                    onChange={this.handleChange}
                                    name="lastname"
                                    value={this.state.lastname}
                                />
                            </div>
                            
                            <div>
                                <p>Gender </p>
                                <select style={{ width: '220px' }} onChange={this.handleSelect}>
                                    <option value="Please Select Gender">Please Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            
                            <div>
                                <p>Date of Birth</p>
                                <input
                                    type="date"
                                    id="birthday"
                                    name="birthday"
                                    value={this.state.birthday}
                                    style={{ width: '220px' }}
                                    onChange={this.handleBirthdayChange}
                                />
                            </div>
                            
                            <div>
                                <p>BVN</p>
                                <input 
                                    type="tel"
                                    onChange={this.handleChange}
                                    name="bvn"
                                    value={this.state.bvn}
                                />
                            </div>
                            
                            <div>
                                <p>BVN Phone No.</p>
                                <input
                                    type="tel"
                                    onChange={this.handleChange}
                                    name="bvnphone"
                                    value={this.state.bvnphone}
                                />
                            </div>
                            <footer className="but">
                                <button onSubmit={this.handleSubmit} className="btn btn-primary">Submit</button>
                              </footer>
                        </form>
                      </div>
                    </div>
                 </div>
            </div>    
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    authUser: state.authUser,
    kyc: state.kyc
})

export default connect(mapStateToProps, { kycandbvn })(PersonalData)
