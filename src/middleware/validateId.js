'use strict';

module.exports = function validateId(ctx, next) {
    try{
        const {id} = ctx.params;
        const objId = new mongoose.Types.ObjectId(id);
        ctx.params.id = objId;
    }
    catch(e){
        ctx.body = {
            message: e.message
        }
        ctx.status = 400;
        return;
    }
    return next();
}