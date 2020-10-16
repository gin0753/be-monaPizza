const loader= require("./src/loaders");
const {router} = require("./src/routes/v1/api");
const config = require('./src/config/app');
const http = require("http");
const bodyParser = require('koa-bodyparser');

loader.app.use(loader.cors());
loader.app.use(bodyParser());
loader.app.use(router.routes());
loader.init();
http.createServer(loader.app.callback()).listen(config.port);
