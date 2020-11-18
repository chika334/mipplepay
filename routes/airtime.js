const Wallet = require('../model/Wallet')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const axios = require('axios')

router.post('/creditTransaction', (req, res) => {
    const { AmountInt, uuidvar, service, phone } = req.body
    
    const user = `${process.env.email_login}:${process.env.password_login}`
    const base64 = btoa(user)
    console.log(base64)
    
    const config = {
        headers: {
          Authorization: Basic
          
        }
      }

    const body = {
        request_id: uuidvar,
        serviceID: service,
        amount: AmountInt,
        phone: phone
    }

    axios.post(`${process.env.airtime}`, body, config)
        .then(res => {
            
        })
        .catch(err => console.log(err))
})

module.exports = router;
