'use strict';

const jwt = require('jsonwebtoken');  
const jwtSecret = 'jwtSecret';

module.exports = function verifyToken (ctx, next) {
  try{
    const bearerHeader = ctx.request.headers['authorization']; 
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, jwtSecret)
    next();
  } catch (err){
    ctx.status = 401;
    ctx.body = {
      message: "Authentication Failed!"
    }
  }

}