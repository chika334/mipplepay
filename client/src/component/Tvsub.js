import React, { Component } from "react";
import { Modal, Alert } from 'react-bootstrap';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {clearErrors} from '../_action/errorAction'
import uuid from 'react-uuid'
import { verifySmartcardNumber } from '../_action/smartCardNumber'
import PropTypes from 'prop-types';

class Tvsub extends Component {
  constructor(props) {
    super(props)
        this.state = {
        name: '',
        email: '',
        type: '',
        show: false,
        phone: '',
        amount: '',
        image: '',
        imageDatas: null,
        data: [],
        service: '',
        smartCard: '',
        transactionId: '',
        select: '',
        msg: null
      }
  };
  
  static propTypes = {
    authUser: PropTypes.object.isRequired,
    verify: PropTypes.object.isRequired
  }

   handleChange = e => {
		const {name, value} = e.target;
		this.setState({ [name]: value })
	}

   componentDidMount() {
    this.data(`${process.env.REACT_APP_IMAGE_TVSUB}`)
    this.FetchPromise();
    const transactionID = uuid();
    this.setState({ transactionId: transactionID })
  }

  data = (url) => {
    axios.get(url)
        .then(json => {
            this.setState({ imageDatas: json.data })
        })
        .catch(response => console.log(response))
  }

  FetchPromise = () => {
     const dstv = fetch(process.env.REACT_APP_DSTV).then(resp => resp.json());
     const gotv = fetch(process.env.REACT_APP_GOTV).then(resp => resp.json());
     const startimes = fetch(process.env.REACT_APP_STARTIMES).then(resp => resp.json());

     Promise.all([dstv, gotv, startimes])
         .then(files => {
            this.setState({ ...this.state, data: files });
         })
         .catch(err => console.log(err))
  }
  
  verifySmartcardNumber = async () => {
    const { service, select, smartCard, transactionId } = this.state
    
    const value = {
       service, 
       smartCard,
       select,
       transactionId
    }
    
    return await verifySmartcardNumber(value, this.props.authUser.token)
  }
  
  Submit = (e) => {
    this.setState({ select: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { amount, select, email, name, phone, smartCard, transactionId, type } = this.state
    
    try {
        const result = await this.verifySmartcardNumber()
        const { success, msg, smartCards } = result;
      
        const verifyCustomerName = smartCards.Customer_Name
        const verifyTransactionID = smartCards.transactionID
        const smartcard = smartCards.Smartcard_Number
      
        if (success) {
         if(transactionId === smartCards.transactionID) {
            this.props.history.push({
                pathname: '/paid',
                search: '?query=abc',
                state: { detail: { amount, select, email, name, phone, smartCard, transactionId, type, verifyTransactionID, verifyCustomerName, smartcard } }
            })
         } else {
            this.setState({ msg: msg })
         }
      }
    }
    catch(err) {
        this.setState({ msg: err.response.data.msg })
    }
  }

  showModal = (data) => {
    this.setState({ show: true, image: data.image });
  };

  handleAirtimeModal = (props) => {
    console.log(props)
    this.setState({ show: true, image: props.image, type: props.type, name: props.name, service: props.serviceID });
  }

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
  const { imageDatas, data } = this.state
  
   if (!data || !data.length) return  null;

  const options = {};
  const [dstv, gotv, startimes] = data;

  options["dstv"] = dstv.content.variations;
  options["gotv"] = gotv.content.variations;
  options["startimes"] = startimes.content.variations;
  
  const dstvData = dstv.content.variations.map((dstvdata, index) => {
    return (
        <>
            <option key={index}>
                {dstvdata.name}
            </option>
        </>
    )
  })

  const gotvData = gotv.content.variations.map((gotvdata, index) => {
    return (
        <>
            <option value={gotvdata.name} key={index}>
                {gotvdata.name}
            </option>
        </>
    )
  })

  const startimesData = startimes.content.variations.map((startimesdata, index) => {
    return (
        <>
            <option value={startimesdata.name} key={index}>
                {startimesdata.name}
            </option>
        </>
    )
  })

  if (!imageDatas) return  null;
  const Imagedatas = imageDatas.content.map((imagedata, index) => {
    return (
            <div className="cards btn" key={index} onClick={() => this.handleAirtimeModal({image: imagedata.image, type: imagedata.name, name: imagedata.name, serviceID: imagedata.serviceID })}>
               <img width="60" height="50" className="pr-2" src={imagedata.image} alt="modal" />
                <div>
                  {imagedata.name}
                </div>
                <small>Choose from a range of bouquets for your entertainment. Easy payment.</small>
            </div>
        );
  })

    return (
      <div>
      <Modal show={this.state.show} onHide={this.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img width="50" src={this.state.image} alt="modal" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div>
		<form className="forms" onSubmit={this.handleSubmit}>
            {this.state.msg ? <Alert variant="danger">{this.state.msg}</Alert> : null}
            
			{this.state.type === "DSTV Subscription" && (<>
              <p>Bouquet: </p>
                <select className="dataDrop" onChange={this.Submit} style={{ width: '65%', marginBottom: '5%', padding: '5px' }} id="cars" name="cars">
                    <option>Select Event Type</option>
                 {dstvData}
                </select>
            </>)}

            {this.state.type === "Gotv Payment" && (<>
              <p>Bouquet: </p>
                <select className="dataDrop" onChange={this.Submit} style={{ width: '65%', marginBottom: '5%', padding: '5px' }} id="cars" name="cars">
                    <option>Select Event Type</option>
                 {gotvData}
                </select>
            </>)}

            {this.state.type === "Startimes Subscription" && (<>
              <p>Bouquet: </p>
                <select className="dataDrop" onChange={this.Submit} style={{ width: '65%', marginBottom: '5%', padding: '5px' }} id="cars" name="cars">
                    <option>Select Event Type</option>
                 {startimesData}
                </select>
            </>)}

            <div className="forms-form-group">
              <p>Phone Number</p>
              <input 
                type="tel" 
                id="quantity"
                value={this.state.phone}
                name="phone"
                placeholder="Enter phone number"
                onChange={this.handleChange}
              />
            </div>
            
            <div className="forms-form-group">
              {this.state.service === "dstv" ? <p>Smartcard Number</p> : this.state.service === "gotv" ? <p>GOtv IUC NUMBER</p> : this.state.service === "startimes" ? <p>Startimes Smartcard /ewallet Number</p> : null}
              <input 
                type="tel" 
                id="quantity"
                value={this.state.smartCard}
                name="smartCard"
                placeholder={this.state.service === "dstv" ? "Enter Smartcard Number" : this.state.service === "gotv" ? "Enter GOtv IUC NUMBER" : this.state.service === "startimes" ? "Enter Startimes Smartcard" : null}
                onChange={this.handleChange}
              />
            </div>

            <div className="forms-form-group">
              <p>Email Address</p>
              <input 
                type="email" 
                className="email" 
                value={this.state.email}
                name="email"
                placeholder="Enter Email"
                onChange={this.handleChange}
              />
            </div>

            <div className="forms-form-group">
              <p>Amount</p>
              <input 
                type="tel" 
                className="password" 
                value={this.state.amount}
                name="amount"
                placeholder="Enter Amount"
                onChange={this.handleChange}
                />
            </div>

            <div className="but">
              <button 
                onSubmit={this.handleSubmit}
                type="submit" 
                className="submit">
                Submit
              </button>
            </div>
          </form>
          </div>
        </Modal.Body>
      </Modal>
        <div className="new">
            {Imagedatas}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    authUser: state.authUser,
    verify: state.verify
})

export default withRouter(connect(mapStateToProps, { clearErrors })(Tvsub))
