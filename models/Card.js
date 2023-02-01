const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    set: {
        type: String,
        required: true
    },
    collector_number: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Cards', CardSchema);