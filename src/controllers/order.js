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
    const respond = await Order.findOne({_id: new mongoose.Types.ObjectId(id)});
    if(respond){
        ctx.body = respond;
    }
    else{
        ctx.status = 404;
        ctx.body = {
            message: `${ id } not found!`
        }
    }
}

exports.displayClientOrder = async (ctx) => {
    let { email, page, pageSize } = ctx.params;
    page = +page;
    pageSize = +pageSize;
    const skip = (page - 1) * pageSize;
    const total = await Order.find({clientEmail: email}).count();
    const orders = await Order.find({clientEmail: email}).skip(skip).limit(pageSize);

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