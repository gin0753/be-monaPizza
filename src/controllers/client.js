'use strict';

const mongoose = require('mongoose');
const Client = require('../models/client');

exports.storeUser = async (ctx) => {
    const {body} = ctx.request;
    const client = new Client(body);
    const {_id} = await client.save();
    ctx.status = 201;
    ctx.body = {
        message: 'Client Info Stored!',
        _id
    }
}

exports.showUser = async (ctx) => {
    const {id} = ctx.params;
    const respond = await Client.findOne({_id: new mongoose.Types.ObjectId(id)});
    if(respond){
        ctx.body = respond;
    }
    else{
        ctx.status = 404;
        ctx.body = {
            message: `${id} Not Exists!`
        }
    }
}

exports.updateUser = async (ctx) => {
    const {id} = ctx.params;
    const {body} = ctx.request;
    const respond = await Client.updateOne(
        {_id: new mongoose.Types.ObjectId(id)}, 
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
  