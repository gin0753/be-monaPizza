'use strict';

const jwt = require('jsonwebtoken'); 
const jwtSecret = 'jwtSecret';
const Users = require('../models/user');

exports.emailConfirm = async (ctx) => {
    const {user} = jwt.verify(ctx.params.token, jwtSecret);
    try{
        await Users.updateOne({_id: user}, {$set: {isVerified: true}});
        await ctx.redirect('http://localhost:3000/redirect');
    }
    catch(err){
        ctx.status = 400;
        ctx.body = {
            message: err
        }
    }
}

