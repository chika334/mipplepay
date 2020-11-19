const mongoose = require("mongoose")

const TransactionSchema = new mongoose.Schema({
    product_name: String,
    transactionId: String,
    amount: String,
    total_amount: String,
    requestId: String,
    date: String,
    amount: String,
    status: String,
    walletId: String
}, { timestamp: true })

module.exports = mongoose.model('Transaction', TransactionSchema)
