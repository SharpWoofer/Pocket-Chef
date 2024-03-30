import mongoose from 'mongoose';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gymSchema = new Schema ({
    name: {
        type : String,
        required : true
    },

    addressBuildingName: {
        type: String // only put if its located in a building e.g mall
    },
    
    addressPostalCode: {
        type: String,
        required: true,
        unique : true
    },

    addressStreetName: {
        type: String,
        required: true,
        unique : true
    },
    
    operatingHours: {
        type: [Object],
        required: true
    },

    phoneNumber: {
        type: Number,
        required: true
    },

    coordinates: {
        type: [Number],
        required: true
    }
}, { timestamps: true});

module.exports = mongoose.model('Gym', gymSchema);