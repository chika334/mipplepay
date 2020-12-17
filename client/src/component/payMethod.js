import React, { useEffect } from 'react';
import '../css/profile.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import pay from '../images/pay.jpg'
import { Link } from 'react-router-dom'

export default function Method() {
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, []);

  return (
    <div className="new container p-3">
      <img src={pay} className="cards" alt="modal" width="100%" />
      <div>
        <h3>Payment Method</h3>
        <small>Payment in three easy steps</small>
          <p>1. Login/ Register</p>
            <small>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful conten</small>
          <p>2. Fund your account</p>
          <small>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful conten</small>
          <p>3. Pay Your Bills</p>
          <small>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful conten</small><br />
          <Link to="/payment" className="btn btn-primary">Get started</Link>
      </div>
    </div>  
  );
}

