import React, { Component } from 'react';
import '../css/Login.scss';
import {Alert} from 'react-bootstrap'
import {signin} from '../_action/userAction.js';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clearErrors} from '../_action/errorAction'
import {Link} from 'react-router-dom'

const emailRegex = RegExp(
	/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
)

export class Login extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			msg: null,
			redirect: false,
			formErrors: {
				email: '',
				password: ''
			}
		}
	}

	static propType = {
		signin: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool,
		auth: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired
	}

	componentDidUpdate(prevProps) {
    const {error, isAuthenticated} = this.props
    if (error !== prevProps.error) {
      // check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({msg: error.msg.msg})
      } else {
        this.setState({msg: null})
      }
    }

    // if authenticated redirect
    if(isAuthenticated) {
      this.setState({redirect: true})
      this.sendRedirect();
      this.props.history.push("/profile/dashboard")
    }
  }

  sendRedirect = () => {
    this.props.clearErrors()
  }

	handleChange = e => {
		const {name, value} = e.target;
		let formErrors = {...this.state.formErrors};

		switch(name) {
			case "email":
				formErrors.email = emailRegex.test(value)
				? ""
				: "Invalid email address"
				break;
			case "password":
				formErrors.password = 
				value.length < 6 ? "minimum of 6 charcter required"
				: ""
				break;
			default:
				break;
		}
		this.setState({ formErrors, [name]: value })
	}

	handleSubmit = e => {
		e.preventDefault();
		const {email, password} = this.state;

		const user = {
			email,
			password
		}

		this.props.signin(user)
	}

	render() {
		const {formErrors} = this.state;
		return (
			<div style={{ padding: '4%' }}>
		<form className="forms" onSubmit={this.handleSubmit}>
            <h2 className="header">Login</h2>
            {this.state.msg ? <Alert variant="danger">{this.state.msg}</Alert> : null}
            <div className="forms-form-group">
              <label>Email</label>
              <input 
                type="email" 
                className="email" 
                value={this.state.email}
                name="email"
                placeholder="Enter Email"
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="forms-form-group">
              <label>Password</label>
              <input 
                type="password" 
                className="password" 
                value={this.state.password}
                name="password"
                placeholder="Enter Password"
                onChange={this.handleChange}
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
                )}
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
           <div className="final-bottom">
            <small className="small">Don't have an account? <Link to="/register">Signup</Link></small>
          </div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  isAuthenticated: state.authUser.isAuthenticated,
  authUser: state.authUser,
  error: state.error
})


export default connect(mapStateToProps, {signin, clearErrors})(Login);
