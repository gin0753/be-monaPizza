'use strict';

const { app } = require('../loaders/koa');
const jwt = require('jsonwebtoken');
const jwtSecret = 'jwtSecret';

exports.store = async (ctx) => {
    const {body} = ctx.request;
    const token = jwt.sign({body}, jwtSecret)
    ctx.body = {
      token 
    }
}
