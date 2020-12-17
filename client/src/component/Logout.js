import React, { Component } from 'react'
import {logout} from '../_action/userAction.js'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export class Logout extends Component {
  static propType = {
    logout: PropTypes.func.isRequired
  }
  render() {
    console.log(this.props)
    return (
        <li className="nav-item">
          <Link className="nav-link" onClick={this.props.logout} to="/login">Signout</Link>
        </li>
    )
  }
}

export default connect(null, {logout})(Logout)
