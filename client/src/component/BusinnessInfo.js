import React, { Component } from 'react'
import { companyUpdate } from '../_action/kyc'
import PropTypes from 'prop-types'
import { connect } from 'react-redux' 
import {Alert} from 'react-bootstrap'

const ListOfState = [
    'Select your state',
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara'
]

const ListOfIdentity = [
    'Select your valid Identity',
    'Drivers Licence',
    'Voters Card',
    'International Passport',
    'International ID card'
]

export class BusinessInfo extends Component {
  state = {
    _id: '',
    companyname: '',
    companyaddress: '',
    caccertificate: null,
    homeaddress: '',
    alternatephone: '',
    localgov: '',
    bill: null,
    State: '',
    identity: '',
    idcard: null,
    passport: null,
    talk: ''
  }
  
  static propTypes = {
    kyc: PropTypes.object.isRequired
  }
  
  handleChange = e => {
    //console.log(e.target.files[0])
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  
  handleImageChange = e => {
    const id = this.props.authUser.user._id
    this.setState({ caccertificate: e.target.files[0], _id: id })
  }
  
  handleBillChange = e => {
    const id = this.props.authUser.user._id
    this.setState({ bill: e.target.files[0], _id: id })
  }
  
  handlePassportChange = e => {
    const id = this.props.authUser.user._id
    this.setState({ passport: e.target.files[0], _id: id })
  }
  
  handleIdcardChange = e => {
    const id = this.props.authUser.user._id
    this.setState({ idcard: e.target.files[0], _id: id })
  }
  
  handleSubmit = e => {
    e.preventDefault()
    const formData=new FormData();
    formData.append("caccertificate",this.state.caccertificate);
    formData.append("idcard",this.state.idcard);
    formData.append("passport",this.state.passport);
    formData.append("bill",this.state.bill);
    formData.append("user_id", this.state._id);
    formData.append("companyname", this.state.companyname);
    formData.append("companyaddress", this.state.companyaddress);
    formData.append("homeaddress", this.state.homeaddress);
    formData.append("alternatephone", this.state.alternatephone);
    formData.append("localgov", this.state.localgov);
    formData.append("State", this.state.State);
    formData.append("identity", this.state.identity);
    formData.append("talk", this.state.talk);
    
    this.props.companyUpdate(formData)
  }

  openModals = () => {
    document.getElementById('id02').style.display='block'
  }
  
  handleSelects = (e) => {
    //console.log('Selected value:', e.target.value);
    this.setState({ State: e.target.value })
  }
  
  handleIdentity = (e) => {
    //console.log('Selected value:', e.target.value);
    this.setState({ identity: e.target.value })
  }
  
  hideModals = () => {
    document.getElementById('id02').style.display='none'
  }
  render() {
  const state = ListOfState.map((allState, index) => {
    return (
        <option value={allState} key={index}>{allState}</option>
    )
  })
  
  const identitys = ListOfIdentity.map((allIdentity, index) => {
    return (
        <option value={allIdentity} key={index}>{allIdentity}</option>
    )
  })
  //console.log(this.state.State)
    return (
      <div>
        <button onClick={this.openModals} className="btn btn-primary">Click to view</button>
      	<div style={{ width: '100%', overflowY: 'scroll' }} id="id02" className="modal">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <header className="container"> 
                    <button onClick={this.hideModals} 
                    className="close">&times;</button>
                    <h5>BUSINESS Info</h5>
                  </header>
                  {this.props.kyc.msg === null ? "" : <Alert variant="success">{this.props.kyc.msg.msg}</Alert>}
                  <div className="modal-body">
                    <div className="container">
                        <form onSubmit={this.handleSubmit}>
                            <div className="new">
                                <div>
                                    <p>Company Name</p>
                                    <input 
                                        type="text"
                                        onChange={this.handleChange}
                                        name="companyname"
                                        value={this.state.companyname}
                                    />
                                </div>
                                
                                <div>
                                    <p>Company Address</p>
                                    <input 
                                        type="text"
                                        onChange={this.handleChange}
                                        name="companyaddress"
                                        value={this.state.companyaddress}
                                    />
                                </div>
                             </div>
                            
                            <div className="new">
                                <div>
                                    <p>Home Address</p>
                                    <input 
                                        type="text"
                                        onChange={this.handleChange}
                                        name="homeaddress"
                                        value={this.state.homeaddress}
                                    />
                                </div>
                                
                                <div>
                                    <p>Alternate Phone</p>
                                    <input 
                                        type="tel"
                                        onChange={this.handleChange}
                                        name="alternatephone"
                                        value={this.state.alternatephone}
                                    />
                                </div>
                             </div>
                            
                            <div className="new">
                                <div>
                                    <p>Local Govt.</p>
                                    <input 
                                        type="text"
                                        onChange={this.handleChange}
                                        name="localgov"
                                        value={this.state.localgov}
                                    />
                                </div>
                                
                                <div>
                                    <p>State</p>
                                    <select style={{ width: '220px' }} onChange={this.handleSelects}>
                                        {state}
                                     </select> 
                                </div>
                             </div>
                            
                            <div className="new">
                                <div>
                                    <p>Type Of Identity</p>
                                    <select style={{ width: '220px' }} onChange={this.handleIdentity}>
                                        {identitys}
                                    </select>
                                </div>
                                
                                <div>
                                    <p>Website</p>
                                    <input 
                                        type="text"
                                        onChange={this.handleChange}
                                        name="website"
                                        value={this.state.website}
                                    />
                                </div>
                             </div>
                             
                             <div className="new">
                                <div className="pl-3">
                                    <p>How do you intend to use our services?</p>
                                    <input 
                                        type="text"
                                        onChange={this.handleChange}
                                        name="talk"
                                        value={this.state.talk}
                                    />
                                </div>
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

export default connect(mapStateToProps, {companyUpdate})(BusinessInfo)
