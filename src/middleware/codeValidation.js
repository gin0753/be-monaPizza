'use strict';

const mongoose = require("mongoose");

const validateId = (ctx, next) => {
    const { id } = ctx.params;

    try {

        const newId = new mongoose.Types.ObjectId(id);
        ctx.params.id = newId

    } catch (e) {

        ctx.status = 400;
        ctx.body = {
            message: e.message
        }
        return;

    }

    return next();
}

const validateCodeInfo = (ctx, next) => {

    const { codeNum } = ctx.request.query;

    const reg = /^[0-9]*$/;

    if (reg.test(codeNum) && codeNum.length === 6) {

        return next();

    } else {
        ctx.status = 400;
        ctx.body = {
            message: e.message
        }
        return;
    }
}

const validateCodePost = (ctx, next) => {

    const { body } = ctx.request;
    const { codeNum, discount } = body;

    if (codeNum.toString().length === 6 && discount > 0) {

        return next();

    } else {
        ctx.status = 400;
        ctx.body = {
            message: "Something wrong"
        }
        return;
    }
}

module.exports = {
    validateId,
    validateCodeInfo,
    validateCodePost
}