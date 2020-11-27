'use strict';

const jwt = require('jsonwebtoken');  
const jwtSecret = 'jwtSecret';
const Users = require('../models/user');

exports.store = async (ctx) => {
    const findUser = await Users.findOne({ Email: ctx.request.body.Email}).exec();
    if(!findUser){
        ctx.status = 404;
        ctx.body = {    
            message: "User not Exists!"
        }
    }
    else if(ctx.request.body.Password !== findUser.Password){
        ctx.status = 401;
        ctx.body = {    
            message: "Incorrect Password!"
        }
    }
    else{
        const { isVerified } = await Users.findOne({ Email: ctx.request.body.Email}).exec();
        if(isVerified){
            const {body} = ctx.request;
            const token = jwt.sign({body}, jwtSecret, { expiresIn: '1h'});
            ctx.status = 200;
            ctx.body = {
                message: "Login Succeeded!",
                username: findUser.UserName,
                id: findUser._id,
                token
            }   
        }
        else{
            ctx.status = 401;
            ctx.body = {
                message: "Please Confirm Your Email Before Logging In!",
            }   
        }
    }
}

