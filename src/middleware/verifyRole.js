'use strict';

const Users = require('../models/user');

module.exports = function verifyRole(role) {
    return async(ctx, next) => {
        const {userId} = ctx.params;
        const findUser = await Users.findOne({_id: userId});
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