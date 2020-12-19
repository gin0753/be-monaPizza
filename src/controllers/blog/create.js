"use strict";

const Blog = require("../../models/Blog");

module.exports = async (ctx) => {
  const { body } = ctx.request;
  const blog = new Blog(body);
  const { _id } = blog.save();
  ctx.status = 201;
  ctx.body = {
    message: "blog created",
    id: _id,
  };
};
