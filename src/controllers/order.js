'use strict';

const Order = require('../models/order');
const mongoose = require('mongoose');

exports.generateOrder = async (ctx) => {
    const {body} = ctx.request;
    const order = new Order(body);
    const {_id} = await order.save();
    ctx.status = 201;
    ctx.body = {
        message: 'Order Generated!',
        _id
    }
}

exports.displayOneOrder = async (ctx) => {
  const { id } = ctx.params;
  const response = await Order.findOne({_id: new mongoose.Types.ObjectId(id)});
  if(response){
      ctx.body = response;
  }
  else{
      ctx.status = 404;
      ctx.body = {
          message: `${ id } not found!`
      }
  }
}

exports.displayPeningOrders = async (ctx) => {
  let { status, page, pageSize  } = ctx.params;
  page = +page;
  pageSize = +pageSize;
  const skip = (page - 1) * pageSize;
  const total = await Order.find({orderStatus: status}).countDocuments();
  const orders = await Order.find({orderStatus: status}).skip(skip).limit(pageSize);
  
  ctx.body = {
    orders,
    total
  };
}

exports.updateOneOrder = async (ctx) => {
    const { id } = ctx.params;
    const { body } = ctx.request;
    const response = await Order.updateOne({_id: new mongoose.Types.ObjectId(id)}, {$set: body})
    if(response.n !== 0){
      ctx.body = {
        message: 'Order Updated Successfully!'
      }
    }
    else{
      ctx.status = 404;
      ctx.body = {
        message: `${id} Not Exists!`
    }
  }
}

exports.displayClientOrder = async (ctx) => {
    let { userId, page, pageSize } = ctx.params;
    page = +page;
    pageSize = +pageSize;
    const skip = (page - 1) * pageSize;
    const total = await Order.find({userId: userId}).countDocuments();
    const orders = await Order.find({userId: userId}).skip(skip).limit(pageSize);

    ctx.body = {
        orders,
        total,
    }
}

exports.deleteOrder = async (ctx) => {
    const { id } = ctx.params;
    const { n } = await Order.deleteOne({ _id: new mongoose.Types.ObjectId(id)});
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