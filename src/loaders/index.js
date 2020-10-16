const mongooseLoader = require('./mongoose');

const { app, router, cors } = require("./koa");

exports.app = app;
exports.router = router;
exports.cors = cors;

exports.init = () => {
    mongooseLoader();
};
