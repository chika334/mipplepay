import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
// const { REACT_APP_GIT_HASH, REACT_APP_MY_ENV } = process.env;

export class Loading extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      redirect: false
    }
  }
  
  static propsTypes = {
    authUser: PropTypes.object.isRequired
  }

  componentDidMount() {
    setTimeout(() => this.setState({redirect: true}), 1000)
  }

  render() {
    const {isAuthenticated, user} = this.props.authUser;
    return (
      <div className="loading">
        {
          isAuthenticated ?
          <div>
            {
              this.state.redirect && user.role !== 0 ?
              <Redirect to='/admin' /> : this.state.redirect && user.role === 0
              ? <Redirect to='/profile' /> : console.log("bad")
            }
          </div>
          : ''
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authUser: state.authUser
})

export default connect(mapStateToProps, null)(Loading);
