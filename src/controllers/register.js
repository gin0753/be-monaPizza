'use strict';

const Users = require('../models/user');

exports.store = async (ctx) => {
    const findUser = await Users.findOne({ Email: ctx.request.body.Email}).exec();
    if(findUser){
      ctx.status = 409;
      ctx.body = {
        message: 'User Exists!',
      }
    }
    else{
      try{
        const {body} = ctx.request;
        const user = new Users(body);
        const {_id} = await user.save();
        ctx.status = 201;
        ctx.body = {
          message: 'User Created!',
          _id
        }
      } catch (err){
        ctx.status = 422;
        ctx.body = {
          message: err
        }
      }
    }
}
