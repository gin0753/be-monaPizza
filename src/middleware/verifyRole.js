'use strict';

const Users = require('../models/user');

module.exports = function verifyRole(role) {
    return async(ctx, next) => {
        let userId;
        // console.log(ctx.request.body)
        ctx.params.userId ? userId = ctx.params.userId : userId = ctx.request.body.userId;
        // console.log(userId)
        const findUser = await Users.findOne({_id: userId});
        // console.log(findUser)
        if(findUser.Role === role){
            return next();
        }
        else{
            ctx.status = 401;
            return ctx.body = {
                message: 'Not Authorized!'
            }
        }
    }
}