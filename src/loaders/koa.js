const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa2-cors");

module.exports.app = new Koa();
module.exports.router = new Router();
module.exports.cors = cors;