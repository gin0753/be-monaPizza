'use strict';

const mongoose = require("mongoose");

const validateId = (ctx, next) => {
    
    const { id } = ctx.params;

    try {

        const newId = new mongoose.Types.ObjectId(id);
        ctx.params.id = newId

    }catch(e) {

        ctx.status = 400;
        ctx.body = {
            message: e.message
        }
        return;

    }

    return next();
}

const validatePizzaInfo = (ctx, next) => {

    const { userId, pizzaName, pizzaSize } = ctx.request.query;

    if(pizzaName !== undefined && pizzaSize !== undefined) {

        try {

            const newUserId = new mongoose.Types.ObjectId(userId);
            ctx.request.query.userId = newUserId;

        }catch (e) {

            ctx.status = 400;
            ctx.body = {
                message: "Bad request"
            }

            return;

        }

        return next();

    }else{

        ctx.status = 400;
        ctx.body = {
            message: "pizzaName and pizzaSize cannot be undefined"
        }
    }
}


const validatePageNum = (ctx, next) => {

    const { userId, page, pageSize } = ctx.params;

    if (page >= 0 && pageSize > 0) {

        try {

            // Convert a string to objectId
            const newUserId = new mongoose.Types.ObjectId(userId);
            ctx.params.userId = newUserId;

        } catch (e) {

            ctx.status = 400;
            ctx.body = {
                message: e.message
            }
            
            return;

        }

        return next();

    } else {
        ctx.status = 400;
        ctx.body = {
            message: "page and pageNum must be larger than 0"
        }
        return;
    }

}

module.exports = {
    validateId,
    validatePizzaInfo,
    validatePageNum
}