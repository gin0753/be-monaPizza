'use strict';

const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema(
    {   
        userId: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        clientFirstName: {
            type: String,
            required: true
        },
        clientLastName: {
            type:String,
            required:true
        },
        companyName: {
            type:String
        },
        billingAddr: {
            type:String,
            required: true
        },
        billingUnit: {
            type:String
        },
        city: {
            type:String,
            required: true
        },
        county: {
            type:String
        },
        postcode: {
            type:Number,
            required: true
        },
        clientEmail: {
            type:String,
            required: true
        },
        contactNumber: {
            type:Number,
            required: true
        },
        shippingAddr: {
            type:String
        },
        shippingUnit: {
            type:String
        }
    },    
);

const Client = mongoose.model('Client', ClientSchema);
module.exports = Client;