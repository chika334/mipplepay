const Wallet = require('../model/Wallet')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const axios = require('axios')
const Pay = require('../model/PayRequest')
const { v4: uuidv4 } = require('uuid');
const Transaction = require("../model/Transaction")

router.get('/getPayment', auth, async (req, res) => {
    const credit = await Pay.find({ walletId: req.user.walletId })
    res.status(200).json(credit)
})

router.get('/getTransaction', auth, async (req, res) => {
    const trans = await Transaction.find({ walletId: req.user.walletId })
    res.status(200).json(trans)
})

router.post('/creditTransaction', auth, async (req, res) => {
    const { AmountInt, service, phone, name } = req.body
    const requestId = uuidv4();

    const user = `${process.env.email_login}:${process.env.password_login}`
    const base64 = Buffer.from(user).toString('base64');

    const config = {
        headers: {
          "Authorization": `Basic ${base64}`
        }
      }

    const body = {
        request_id: requestId,
        serviceID: service,
        amount: AmountInt,
        phone: phone
    }
    
    const userId = await Wallet.findById(req.user.walletId)

    axios.post(`${process.env.airtime}`, body, config)
        .then(res => {
            const pay = new Pay({
                amount: res.data.amount,
                requestId: res.data.requestId,
                product_name: res.data.content.transactions.product_name,
                date: res.data.transaction_date.date,
                total_amount: res.data.content.transactions.total_amount,
                transactionId: res.data.content.transactions.transactionId,
                status: res.data.response_description,
                walletId: userId._id,
            })

            pay.save();
            console.log(res.data)
        })
        .catch(err => console.log(err))
        
   res.status(200).json({
       msg: 'success'
   })
})

router.post('/Transaction', auth, async (req, res) => {
    const { trans } = req.body

    const user = `${process.env.email_login}:${process.env.password_login}`
    const base64 = Buffer.from(user).toString('base64');

    const config = {
        headers: {
          "Authorization": `Basic ${base64}`
        }
      }

    const body = {
        request_id: trans,
    }
    
    const userId = await Wallet.findById(req.user.walletId)

    axios.post(`${process.env.specificTrans}`, body, config)
        .then(res => {
            const trans = new Transaction({
                amount: res.data.content.transactions.amount,
                requestId: req.body.trans,
                product_name: res.data.content.transactions.type,
                date: res.data.transaction_date.date,
                total_amount: res.data.content.transactions.total_amount,
                transactionId: res.data.content.transactions.transactionId,
                status: res.data.response_description,
                walletId: userId._id,
            })

            trans.save();
            console.log(res.data)
        })
        .catch(err => console.log(err))
        
   res.status(200).json({
       msg: 'success'
   })
})

module.exports = router;
