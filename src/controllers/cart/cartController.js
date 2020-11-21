const Cart = require("../../models/cart/cartModel");

const mongoose = require('mongoose');

const getCartById = async (ctx) => {

    const { id } = ctx.params;

    const res = await Cart.findOne({_id: id});

    if (res) {
        ctx.status = 200;
        ctx.body = res;
    }else{
        ctx.status = 404;
        ctx.body = {
            message: "Nothing is found"
        }
    }
    
}

const getCartByInfo = async (ctx) => {
    
    const { userId, pizzaName, pizzaSize } = ctx.request.query;

    const res = await Cart.findOne({
        userId,
        pizzaName,
        pizzaSize
    })

    if(res) {
        ctx.status = 200;
        ctx.body = res;
    }else{
        ctx.status = 404;
        ctx.body = {
            message: "Failed to find the record"
        }
    }
}

const getCartByUser = async (ctx) => {

    const { userId, page, pageSize} = ctx.params;

    const res = await Cart.find({userId: userId});

    if(res) {
        const newArr = res.splice((page-1)*pageSize, pageSize);

        ctx.status = 200;
        ctx.body = newArr;
    }else{
        ctx.status = 404;
        ctx.body = {
            message: "Failed to find the records"
        }
    }
    
}


const createCart = async (ctx) => {
    
    const { body } = ctx.request;

    const cart = new Cart(body);
    const res = await cart.save();

    if(res) {

        ctx.status = 201;
        ctx.body = res;

    }else{

        ctx.status = 404;
        ctx.body = {
            message: "Failed to create the object"
        }

    }
}

const updateCart = async (ctx) => {
    
    const { id } = ctx.params;
    const { body } = ctx.request;
    
    const res = await Cart.findOneAndUpdate({ _id: id}, body);

    if(res) {
        ctx.status = 200;
        ctx.body = {
            _id: res._id,
            message: "Successfully update the cart"
        }
    }else {
        ctx.status = 404;
        ctx.body = {
            message: "Failed to updated"
        }
    }

}

const deleteCart = async (ctx) => {
    
    const { id } = ctx.params;
    
    const res = await Cart.deleteOne({_id: id});
    
    if(res) {
        ctx.status = 200;
        ctx.body = {
            message: "Successfully delete the record"
        }
    }else{
        ctx.status = 404;
        ctx.body = {
            message: "Failed to delete the record"
        }
    }
}


module.exports = {
    getCartById,
    getCartByInfo,
    getCartByUser,
    createCart,
    updateCart,
    deleteCart
}