import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { FaAlignRight, FaMoneyBillAlt } from "react-icons/fa";
import { GiWallet } from 'react-icons/gi'
import { BiTransfer, BiHelpCircle, BiWallet } from 'react-icons/bi'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import Aos from 'aos'
import 'aos/dist/aos.css'   
import '../css/profile.css'                        

export class NavBar extends Component {
  state= {
    isOpen: false,
  }
  
  componentDidMount() {
    Aos.init({ duration: 2000 })
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  
  render() {
    const { user, isAuthenticated } = this.props.authUser;
    const noUser = (
      <>
        <li className="nav-item">
			<Link className="nav-link" to="/agent">Become an agent</Link>
		</li>
		<li className="nav-item">
			<Link className="nav-link" to="/earning">Start Earning</Link>
		</li>
      </>
    )

    const users = (
      <>
        <li  className="nav-item">
          <Link className="nav-link" to="/profile/earning"><GiWallet/> Total Earning: ₦0</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile/transaction"><BiTransfer /> Transactions</Link>
        </li>
        <li className="nav-item">
            <DropdownButton id="dropdown-basic-button" title="Quick Tools">
              <Dropdown.Item href="#/action-1">Report</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Manage</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/help"><BiHelpCircle/> Help/Support</Link>
        </li>
        
         <li className="nav-item ml-5">
          <button style={{ backgroundColor: 'Transparent', backgroundRepeat: 'no-repeat', border: '1px solid grey', borderRadius: '3px' }} className="nav-link" href="/help"><Link style={{ textDecoration: 'none' }} to="/profile/wallet"><BiWallet /> Wallet: ₦0</Link></button>
        </li>
      </>
    )

    return (
        <div data-aos="fade-right" className="navbar navbar-expand-lg navbar-light">
          <button className="navbar-toggler" onClick={this.toggle} type="button" data-toggle="collapse" >
			<FaAlignRight className="nav-icon" />
		  </button>

          <div className={this.state.isOpen ? "navbar-collapse" : "collapse navbar-collapse"}>
            <ul className="navbar-nav nav-center ml-auto text-right">
				<li className="nav-item">
					<Link className="nav-link" to="/payment"><FaMoneyBillAlt /> Make Payment</Link>
				</li>
              {
                isAuthenticated ? users : noUser
              }
			</ul>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  authUser: state.authUser
})

export default connect(mapStateToProps, null)(NavBar)
