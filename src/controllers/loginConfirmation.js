'use strict';

const jwt = require('jsonwebtoken'); 
const jwtSecret = 'jwtSecret';
const Users = require('../models/user');

exports.emailConfirm = async (ctx) => {
    const {user} = jwt.verify(ctx.params.token, jwtSecret);
    try{
        await Users.updateOne({_id: user}, {$set: {isVerified: true}});
        await ctx.redirect('https://pizza-2021.s3-ap-southeast-2.amazonaws.com/redirect');
    }
    catch(err){
        ctx.status = 400;
        ctx.body = {
            message: err
        }
    }
}

