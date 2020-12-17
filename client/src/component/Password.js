import React, { Component } from 'react'
import '../css/Login.scss';
import { connect } from 'react-redux'
import {Alert} from 'react-bootstrap'
import { updatePassword } from '../_action/userAction'

export class Password extends Component {
    state = {
        _id: '',
        email: '',
        old_password: '',
        new_password: '',
        confirm_new_password: '',
        msg: null
    }
    
    handleChange = e => {
		const {name, value} = e.target;
		const id = this.props.authUser.user._id
		const email = this.props.authUser.user.email
		let formErrors = {...this.state.formErrors};

		switch(name) {
			case "old_password":
				formErrors.old_password = 
				value.length < 6 ? "minimum of 6 charcter required"
				: ""
				break;
		    case "new_password":
				formErrors.new_password = 
				value.length < 6 ? "minimum of 6 charcter required"
				: ""
				break;
			case "confirm_new_password":
				formErrors.confirm_new_password = 
				value.length < 6 ? "minimum of 6 charcter required"
				: ""
				break;
			default:
				break;
		}
		this.setState({ formErrors, [name]: value, _id: id, email: email })
	}
	
	handleSubmit = e => {
		e.preventDefault();
		const { _id, email, old_password, new_password, confirm_new_password} = this.state;
		if (old_password === new_password) {
		    this.setState({ msg: "New password must be different from Old Password" })
		} else {
		    if (new_password !== confirm_new_password) {
		        this.setState({ msg: "New Password comparison failed" })
		    } else {
		        // send to backend
		        const users = {
		            _id,
		            email,
		            old_password,
			        new_password,
			        confirm_new_password
		        }
		        
		        console.log(users)
		        
		        this.props.updatePassword(users)
		    }
		}
		//this.props.signin(user)
	}
	
  render() {
    return (
      <div className="container">
      	<form className="forms" onSubmit={this.handleSubmit}>
      	    {this.state.msg ? <Alert variant="danger">{this.state.msg}</Alert> : null}
      	    <div className="forms-form-group">
                <p>Old Password</p>
                <input 
                    type="password"
                    className="password"
                    onChange={this.handleChange}
                    name="old_password"
                    value={this.state.old_password}
                />
            </div>
            
            <div className="forms-form-group">
                <p>New Password</p>
                <input 
                    type="password"
                    className="password"
                    onChange={this.handleChange}
                    name="new_password"
                    value={this.state.new_password}
                />
            </div>
            
            <div className="forms-form-group">
                <p>Confirm New Password</p>
                <input 
                    type="password"
                    className="password"
                    onChange={this.handleChange}
                    name="confirm_new_password"
                    value={this.state.confirm_new_password}
                />
            </div>
            <button onSubmit={this.handleSubmit} className="btn btn-primary">Update</button>
      	</form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    authUser: state.authUser,
})

export default connect(mapStateToProps, {updatePassword})(Password)
