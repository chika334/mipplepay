import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="page-footer text-light font-small blue bg-dark p-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Link to="/terms">Terms and condition</Link>
        </footer>
       
      </div>
    )
  }
}

export default Footer
