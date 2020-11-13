"use strict";

const mongoose = require("mongoose");
const Blog = require("../../models/Blog");

module.exports = async (ctx) => {
  const { id } = ctx.params;
  const { body } = ctx.request;
  const { n } = await Blog.updateOne({ _id: id }, { $set: body });
  console.log(n);
  if (n === 0) {
    ctx.body = {
      message: `${id} not found!`,
    };
    ctx.status = 404;
  } else {
    ctx.status = 200;
  }
};
