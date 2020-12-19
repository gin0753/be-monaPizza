"use strict";

const Blog = require("../../models/Blog");

module.exports = async (ctx) => {
  const { id } = ctx.params;
  const { n } = await Blog.deleteOne({ _id: id });
  if (n === 0) {
    ctx.body = {
      message: `${id} not found!`,
    };
    ctx.status = 404;
  } else {
    ctx.body = {
      message: `${id} deleted!`,
    };
    ctx.status = 200;
  }
};
