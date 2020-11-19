'use strict';

const jwt = require('jsonwebtoken');  
const jwtSecret = 'jwtSecret';
const Users = require('../models/user');

exports.store = async (ctx) => {
    const findUser = await Users.findOne({ Email: ctx.request.body.Email}).exec();
    const {body} = ctx.request;
    const token = jwt.sign({body}, jwtSecret, { expiresIn: '1h'});
    if(!findUser){
        const user = new Users(body);
        const {_id} = await user.save();
        ctx.status = 201;
        ctx.body = {
          message: 'User Created!',
          _id,
          token
        }
    }
    else{
        ctx.status = 200;
        const {_id, UserName} = findUser;
        ctx.body = {
            message: "Login Succeeded!",
            _id,
            UserName,
            token
        }   
    }
}