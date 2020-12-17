import { connect } from 'react-redux'
import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, authUser, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated === true && authUser.user.role === 1
      ? <Component {...props} />
       // ? console.log()
      : <Redirect to='/login' />
  )}
  />
)

const mapStateToProps = state => ({
  isAuthenticated: state.authUser.isAuthenticated,
  authUser: state.authUser
})

export default connect(mapStateToProps, null)(AdminRoute)
