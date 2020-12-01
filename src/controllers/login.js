'use strict';

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');  
// const mongoose = require('../loaders/mongoose');
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

exports.matchPassword = async (ctx) => {
    const {userId, currentPassword} = ctx.params;
    const {Password} = await Users.findOne({_id: new mongoose.Types.ObjectId(userId)});
    if(currentPassword === Password){
        ctx.body = {
            message: `Correct Password!`
        };
    }
    else{
        ctx.status = 401;
        ctx.body = {
            message: `Incorrect Password!`
        }
    }
}

exports.updatePassword = async (ctx) => {
    const {userId} = ctx.params;
    const {body} = ctx.request;
    const response = await Users.updateOne(
        {_id: userId}, 
        {$set: body}
    );
    if(response.n !== 0){
        ctx.body = {
            message: `Password Updated Successfully!`
        };
    }
    else{
        ctx.status = 404;
        ctx.body = {
            message: `${userId} Not Exists!`
        }
    }
}