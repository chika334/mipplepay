import React, { Component } from 'react';
import '../css/Login.scss';
import {Redirect, Link} from 'react-router-dom'
import { insurance } from '../_action/insurance'
import { connect } from 'react-redux'

export class Particulars extends Component {
	constructor(props) {
		super(props)

		this.state = {
		    name: 'daniel',
			plateNumber: 'jnaueh9i3190',
			engineNumber: 'n0owq09wnqw',
			chasisNumber: '898qwnajsdh8wj',
			vehicleMake: 'toyota',
			vehicleColor: 'red',
			vehicleModel: 'camry',
			YearofMake: '',
			ContactAddress: 'hello'
		}
	}

	handleChange = e => {
		const {name, value} = e.target;
		this.setState({ [name]: value })
	}

	handleSubmit = e => {
		e.preventDefault();
		const { name, plateNumber, engineNumber, chasisNumber, vehicleMake, vehicleColor, vehicleModel, YearofMake, ContactAddress } = this.state;
        const service = this.props.location.state.detail.service
        const amount = this.props.location.state.detail.amount
        const phone = this.props.location.state.detail.phone
        const variation = this.props.location.state.detail.variation
        const select = this.props.location.state.detail.select
		
		const value = {
		    service, 
		    amount,
		    phone,
		    variation,
		    name, 
		    plateNumber, 
		    engineNumber, 
		    chasisNumber, 
		    vehicleMake, 
		    vehicleColor, 
		    vehicleModel, 
		    YearofMake, 
		    ContactAddress,
		    select
		}
		
		this.props.insurance(value)
	}

	render() {
		return (
	    <div style={{ padding: '2px' }}>
		    <form className="forms" onSubmit={this.handleSubmit}>
                <h2 className="header">Fill Particulars</h2>
                <div className="new">
                    <div className="forms-form-group">
                      <label>Vehicle Plate Number</label>
                      <input 
                        type="text" 
                        className="email" 
                        value={this.state.plateNumber}
                        name="plateNumber"
                        placeholder="Enter Vehicle Plate Number"
                        onChange={this.handleChange}
                        required
                      />
                    </div>

                    <div className="forms-form-group">
                      <label>Name</label>
                      <input 
                        type="text" 
                        className="password" 
                        value={this.state.name}
                        name="name"
                        placeholder="Enter Name"
                        onChange={this.handleChange}
                        required
                        />
                    </div>
                </div>
                
                <div className="new">
                    <div className="forms-form-group">
                      <label>Engine Number</label>
                      <input 
                        type="text" 
                        className="password" 
                        value={this.state.engineNumber}
                        name="engineNumber"
                        placeholder="Enter Engine Number"
                        onChange={this.handleChange}
                        required
                        />
                    </div>
                    
                    <div className="forms-form-group">
                      <label>Chasis Number</label>
                      <input 
                        type="text" 
                        className="email" 
                        value={this.state.chasisNumber}
                        name="chasisNumber"
                        placeholder="Enter Chasis Number"
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                </div>

                <div className="new">
                    <div className="forms-form-group">
                      <label>Vehicle Make</label>
                      <input 
                        type="text" 
                        className="password" 
                        value={this.state.vehicleMake}
                        name="vehicleMake"
                        placeholder="Enter Vehicle Make"
                        onChange={this.handleChange}
                        required
                        />
                    </div>
                    
                    <div className="forms-form-group">
                      <label>Vehicle Color</label>
                      <input 
                        type="text" 
                        className="password" 
                        value={this.state.vehicleColor}
                        name="vehicleColor"
                        placeholder="Enter Vehicle Color"
                        onChange={this.handleChange}
                        required
                        />
                    </div>
                </div>
                
                <div className="new">
                    <div className="forms-form-group">
                      <label>Vehicle Model</label>
                      <input 
                        type="text" 
                        className="password" 
                        value={this.state.vehicleModel}
                        name="vehicleModel"
                        placeholder="Enter Vehicle Model"
                        onChange={this.handleChange}
                        required
                        />
                    </div>
                    
                    <div className="forms-form-group">
                      <label>Year of Make</label>
                      <input 
                        type="date" 
                        className="password" 
                        value={this.state.YearofMake}
                        name="YearofMake"
                        onChange={this.handleChange}
                        required
                        />
                    </div>
                </div>
                
                <div className="forms-form-group">
                  <label>Contact Address</label>
                  <input 
                    type="text" 
                    className="password" 
                    value={this.state.ContactAddress}
                    name="ContactAddress"
                    placeholder="Enter Contact Address"
                    onChange={this.handleChange}
                    required
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
		)
	}
}

export default connect(null, { insurance })(Particulars)
