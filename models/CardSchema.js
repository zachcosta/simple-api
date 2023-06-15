const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    // GENERAL DATA
    _id: {
        type: String,
        required: true
    },
    oracle_id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    lang: {
        type: String,
        required: true
    },
    // SET DATA
    released_at: {
        type: String,
        required: true
    },
    set: {
        type: String,
        required: true
    },
    collector_number: {
        type: String,
        required: true
    },
    story_spotlight: {
        type: Boolean,
        required: true
    },
    artist_ids: {
        type: [String],
        required: true
    },
    // // FRAME DATA
    layout: {
        type: String,
        required: true
    },
    finishes: {
        type: [String],
        enum: ['nonfoil', 'foil', 'etched'],
        required: true
    },
    frame: {
        type: String,
        required: true
    },
    frame_effects: {
        type: [String],
        required: true
    },
    promo_types: {
        type: [String],
        required: true
    },
})

module.exports = CardSchema;