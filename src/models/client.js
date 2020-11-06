'use strict';

const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema(
    {
        Country: {
            type: String,
            required: true
        },
        FirstName: {
            type: String,
            required: true
        },
        LastName: {
            type:String,
            required:true
        },
        CompanyName: {
            type:String
        },
        Street: {
            type:String,
            required: true
        },
        OptionalAddr: {
            type:String
        },
        City: {
            type:String,
            required: true
        },
        County: {
            type:String
        },
        Postcode: {
            type:Number,
            required: true
        },
        Email: {
            type:String,
            required: true
        },
        Phone: {
            type:Number,
            required: true
        }
    },    
);

const Client = mongoose.model('Client', ClientSchema);
module.exports = Client;