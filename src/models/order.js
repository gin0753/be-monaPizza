'use strict';

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    
    {
        orderPlacedTime: {
            type: String,
            required: true
        },
        orderList: {
            type: Array,
            required: true
        },
        clientFirstName: {
            type: String,
            required: true
        },
        clientLastName: {
            type: String,
            required: true
        },
        billingAddr: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postcode: {
            type: Number,
            required: true
        },
        contactNumber: {
            type: Number,
            required: true
        },
        clientEmail: {
            type: String,
            required: true,
            match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        },
        cartSubTotal: {
            type: Number,
            // required: true
        },
        totalPrice: {
            type: Number,
            // required: true
        },
        shippingAddr: {
            type: String
        },
        shippingCosts: {
            type: Number
        }
    },    
);

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;