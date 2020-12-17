import React, { Component } from 'react'
import './App.css';
import {Route, Switch} from 'react-router-dom';

// component
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import ProtectedRoutes from './protectedRoutes/ProtectedRoutes.js'
import Wallet from './component/Wallet'
import { getPay } from './_action/airtime'
import { getTransaction } from './_action/airtime'

// pages
import Login from './pages/Login.js';
import Register from './pages/Register.js'
import UserProfile from './pages/UserProfile.js'
import Home from './pages/Homesecond.js'
//import Home from './pages/Home.js'
import About from './pages/About.js'
import Error from './pages/Error.js'
import Transactions from './pages/Transactions'
import Payment from './pages/Payment'
import Account from './pages/Account'
import {getUser} from './_action/userAction.js'
import Paid from './component/paidTransaction'
import store from './store'
import { initialWallet } from './_action/wallet'
import CreditCard from './component/creditCard'
import Details from './component/Details'
import { dataTransaction } from './_action/data'
import { NumberverifyTransaction } from './_action/electric'
import { getverifySmartcardNumber } from './_action/TvsubAction'
import Example from './component/walletTran'

export class App extends Component {
  	componentDidMount() {
        store.dispatch(getUser())
        store.dispatch(initialWallet())
        store.dispatch(getPay())
        store.dispatch(getTransaction())
        store.dispatch(dataTransaction())
        store.dispatch(NumberverifyTransaction())
        store.dispatch(getverifySmartcardNumber())
	}
  render() {
    return (
      <div>
    	<Navbar />
    	<Switch>
    	    <Route exact path={"/"} component={Home} />
    		<Route exact path={"/login"} component={Login} />
    		<Route exact path={"/register"} component={Register} />
    		<Route exact path={"/about"} component={About} />
    		<Route exact path={"/payment"} component={Payment} />
    		<Route exact path={"/paid"} component={Paid} />
    		<ProtectedRoutes exact path={"/card"} component={CreditCard} />
    		<Route exact path={"/details"} component={Details} />
    		<Route exact path={"/confirmWallet"} component={Example} />
    		<Route exact path={"/profile/transaction"} component={Transactions} />
    		<Route exact path={"/profile/wallet"} component={Wallet} />
    		<ProtectedRoutes exact path={"/profile/dashboard"} component={UserProfile} />
    		<ProtectedRoutes exact path={"/profile"} component={Account} />
    		<Route component={Error} />
    	</Switch>
    	<Footer/>
      </div>
    )
  }
}

export default App
