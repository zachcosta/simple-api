import * as mongoose from 'mongoose';

export const CardSchema = mongoose.Schema({
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
    booster: {
        type: Boolean,
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
        type: [String],
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
    // PRINT DATA
    reprint: {
        type: Boolean,
        required: true
    },
    promo: {
        type: Boolean,
        required: true
    },
    variant: {
        type: Boolean,
        required: true
    },
    reserved: {
        type: Boolean,
        required: true
    },
});