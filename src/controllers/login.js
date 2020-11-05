'use strict';

const { app } = require('../loaders/koa');
// const jwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const jwtSecret = 'jwtSecret';
const tokenExp = 1000 * 60 * 60 * 24 * 7

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function(ctx, next){
    return next().catch((err) => {
      if (401 == err.status) {
        ctx.status = 401; 
        ctx.body = 'Protected resource, use Authorization header to get access\n';
      } else {
        throw err;
      }
    });
  });

// app.use(jwt({ secret: jwtSecret }));  

exports.show = async (ctx) => {
    const {body} = ctx.request;
    const token = jwt.sign({body}, jwtSecret );
    ctx.body = {
        token
    }
}

exports.store = async (ctx) => {
    jwt.verify(ctx.request.token, jwtSecret, (err, authData, expiresIn) => {
        if(err){
            ctx.status = 403;
        }
        else{
            ctx.body = {
                message: "OK",
                authData,
                expiresIn: tokenExp
            }   
        }
    })
}

