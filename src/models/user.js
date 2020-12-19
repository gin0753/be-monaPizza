'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {   
        UserName: {
            type: String,
            required: true
        },
        SurName: {
            type: String
        },
        Email: {
            type:String,
            required:true,
            unique: true,
            match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        Password: {
            type:String,
            required:true
        },
        GoogleID: {
            type: String
        },
        Role: {
            type: String,
            required: true,
            default: 'ROLE.BASIC'
        }
    },    
);

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;