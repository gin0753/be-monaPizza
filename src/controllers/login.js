'use strict';

const { app } = require('../loaders/koa');
const jwt = require('jsonwebtoken');  
const jwtSecret = 'jwtSecret';
const Users = require('../models/user');

exports.store = async (ctx) => {
    const findUser = await Users.findOne({ Email: ctx.request.body.Email}).exec();
    if(!findUser || ctx.request.body.Password !== findUser.Password){
        ctx.status = 401;
        ctx.body = {
            message: "Login Failed!"
        }
    }
    else{
        console.log(ctx.headers);
        const {body} = ctx.request;
        const token = jwt.sign({body}, jwtSecret, { expiresIn: '1h'});
        ctx.status = 200;
        ctx.body = {
            message: "Login Succeeded!",
            token
        }   
    }
}

