const mongoose = require('mongoose')

const { Schema } = mongoose;

const CustomerSchema = new Schema({
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
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);