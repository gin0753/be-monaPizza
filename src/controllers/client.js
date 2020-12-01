'use strict';

const mongoose = require('mongoose');
const Client = require('../models/client');

exports.storeUser = async (ctx) => {
    const {body} = ctx.request;
    const userId = body.userId;
    const findUser = await Client.findOne({userId: userId})
    if(!findUser){
        const client = new Client(body);
        const {_id} = await client.save();
        ctx.status = 201;
        ctx.body = {
            message: 'Client Info Stored!',
            _id
        }
    }
    else{
        ctx.status = 409;
        ctx.body = {
            message: 'Client Already Exists!'
        }
    }
}

exports.showUser = async (ctx) => {
    const {userId} = ctx.params;
    const respond = await Client.findOne({userId: userId});
    if(respond){
        ctx.body = respond;
    }
    else{
        ctx.status = 404;
        ctx.body = {
            message: `${userId} Not Exists!`
        }
    }
}

exports.updateUser = async (ctx) => {
    const {userId} = ctx.params;
    const {body} = ctx.request;
    const respond = await Client.updateOne(
        {userId: userId}, 
        {$set: body}
   );
   if(respond.n !== 0){
      ctx.body = {
          message: 'Updated Successfully!'
      }
   }
   else{
       ctx.status = 404;
       ctx.body = {
          message: `${id} Not Exists!`
      }
   }
}

exports.deleteUser = async (ctx) => {
    const { id } = ctx.params;
    const { n } = await Client.deleteOne({ _id: new mongoose.Types.ObjectId(id)});
    if (n === 0) {
      ctx.body = {
        message: `${id} not found!`,
      };
      ctx.status = 404;
    } else {
      ctx.body = {
        message: `${id} deleted!`,
      };
      ctx.status = 200;
    }
  };
  