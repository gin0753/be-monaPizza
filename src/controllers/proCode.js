'use strict';

const mongoose = require('mongoose');
const Code = require('../models/proCode');

exports.getCode = async (ctx) => {

    const { promoCode } = ctx.params;
    
    const res = await Code.findOne({codeNum: promoCode});


    if(res) {
        ctx.status = 200;
        ctx.body = res;
    }else{
        ctx.status = 404;
        ctx.body = {
            message: "Nothing is found"
        }
    }
    
}

exports.createCode = async (ctx) => {
    // {
    //     "codeNum": 2566,
    //     "discount": 5
    // }
    const { body } = ctx.request;
    
    const code = new Code(body);
    const { _id } = await code.save();

    ctx.status = 201;
    ctx.body = {
        _id,
        message: "Successfully created"
    }
    
}

exports.updateCode = async (ctx) => {
    async (ctx) => {
        const { body } = ctx.request;
        const { promoCode } = ctx.params;
        
    
        const { n } = await Code.updateOne(
            { codeNum: promoCode },
            {
                $set: body,
            }
        );
    
        if (n === 0) {
            ctx.body = {
                message: `${id} not found!`,
            };
            ctx.status = 404;
        } else {
            ctx.status = 200;
        }
    }
}

exports.deleteCode = async (ctx) => {
    const { promoCode } = ctx.params;
    const { n } = await Code.deleteOne({ codeNum: promoCode });
    if (n === 0) {
        ctx.body = {
            message: `${promoCode} not found!`,
        };
        ctx.status = 404;
    } else {
        ctx.status = 200;
    }
}