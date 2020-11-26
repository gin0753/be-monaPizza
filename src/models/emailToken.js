'use strict';

const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
    {   
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        token:{
            type: String,
            required: true
        },
        tokenCreated: {
            type: Date,
            required:true,
            default: Date.now,
            expires: 86400
        }
    },    
);

const Menu = mongoose.model('Menu', tokenSchema);
module.exports = Menu;