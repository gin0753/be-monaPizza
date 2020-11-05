'use strict';

module.exports = function verifyToken (ctx, next) {
    const bearerHeader = ctx.request.headers['authorization']; 
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        ctx.request.token = bearerToken;
        next();
    } else {
      ctx.status = 403;
    }
   
  }