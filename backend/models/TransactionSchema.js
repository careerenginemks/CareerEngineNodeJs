const mongoose = require('mongoose')

const { Schema } = mongoose;

const TransactionSchema = new Schema({
    type: {
        type: String,
        enum: ['Admin to Customer', 'Admin to Vendor'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    interestRate: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
    },
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);