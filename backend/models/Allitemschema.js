const mongoose = require('mongoose')
const { Schema } = mongoose;

const AllitemSchema = new Schema({
    itemName:{
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('allitems', AllitemSchema);