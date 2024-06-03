const mongoose = require('mongoose')
const { Schema } = mongoose;

const VendorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    interestRateSpread: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Vendor', VendorSchema);