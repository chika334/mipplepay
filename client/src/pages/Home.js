import React, { useState, useEffect } from 'react'
import Hero from '../component/Hero'
import Banner from '../component/Banner'
import { GiWallet } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import Aos from 'aos'
import 'aos/dist/aos.css'
import ListProduct from '../component/ListProduct'
import presentation from '../images/presentation.jpg'
import Method from '../component/payMethod'

const title = (
    <>
        Mipplepay<GiWallet />
    </>
)

function Home() {
  
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, []);

  return (
    <>
        <img src={presentation} className="backside" />
       <div className="setImage" data-aos="fade-left">
        <Hero>
          <Banner
              title={title}
              subtitle="Payment made easy"
            >
              <Link to="/about" className="btn btn-primary">
                Learn More
              </Link>
           </Banner>
        </Hero>
       </div>
       <Method />
       <ListProduct />
    </>
  );
}

export default Home
