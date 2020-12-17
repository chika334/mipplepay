import React, { useEffect } from 'react';
import '../css/profile.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { RiCustomerService2Line } from 'react-icons/ri'

export default function ListProduct() {
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, []);

  return (
    <div>
      <h3 className="services" style={{ color: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>Transactions</h3>
      <div className="new" data-aos="fade-left">
          <div className="cards new bg-light" style={{ borderRadius: '20px', color: 'white', padding: '30px' }}>
            <table style={{ width: '100%' }}>
          	    <tbody>
              	    <tr>
              	        <td><a href="#">Buy Credit</a></td>
              	    </tr>
              	    <tr>
              	        <td><a href="#">Buy Data</a></td>
              	    </tr>
              	    <tr>
              	        <td><a href="#">Pay TV Subscription</a></td>
              	    </tr> 
              	    <tr>
              	        <td><a href="#">Pay Electricity Bill</a></td>
              	    </tr>        
          	    </tbody>
          	</table>
          	<table style={{ width: '100%' }}>
          	    <tbody>
              	    <tr>
              	        <td><a href="#">Education</a></td>
              	    </tr>
              	    <tr>
              	        <td><a href="#">Bank Transfer</a></td>
              	    </tr>
              	    <tr>
              	        <td>Other...</td>
              	    </tr>      
          	    </tbody>
          	</table>
          </div> 
          
          <div className="cards new bg-light" data-aos="fade-left" style={{ borderRadius: '20px', color: '#000', padding: '30px' }}>
            <table style={{ width: '100%' }}>
          	    <tbody>
              	    <tr>
              	        <td>Daily</td>
              	    </tr>
              	    <tr>
              	        <td>Weekly</td>
              	    </tr>
              	    <tr>
              	        <td>Monthly</td>
              	    </tr> 
              	    <tr>
              	        <td>Business Info</td>
              	    </tr>        
          	    </tbody>
          	</table>
          	
          	<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          	    
          	</div>
          </div> 
        </div>
    </div>  
  );
}

