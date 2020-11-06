'use strict';

const { app } = require('../loaders/koa');
const jwt = require('jsonwebtoken');
const jwtSecret = 'jwtSecret';
const Users = require('../models/user');

exports.store = async (ctx) => {
    const findUser = await Users.findOne({ Email: ctx.request.body.Email}).exec();
    console.log(findUser.Password);
    if(findUser){
      ctx.status = 409;
      ctx.body = {
        message: 'User Exists!',
      }
    }
    else{
      const {body} = ctx.request;
      const user = new Users(body);
      const {_id} = await user.save();
      ctx.status = 201;
      ctx.body = {
        message: 'User Created!',
        _id
      }
    }
}
