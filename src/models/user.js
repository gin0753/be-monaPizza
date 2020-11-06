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
            required:true
        },
        Password: {
            type:String,
            required:true
        }
    },    
);

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;