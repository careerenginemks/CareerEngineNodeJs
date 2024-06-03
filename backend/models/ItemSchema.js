const mongoose = require('mongoose')
const { Schema } = mongoose;

const ItemSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    itemName:{
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pledged', 'returned'],
        default: 'pledged'
    },
    photo: {
        type: String,
        required: true,
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
    }
});

module.exports = mongoose.model('Item', ItemSchema);