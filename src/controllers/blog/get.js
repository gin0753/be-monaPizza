"use strict";
const Blog = require("../../models/Blog");

module.exports = async (ctx) => {
  let { page, pageSize } = ctx.params;
  page = +page;
  pageSize = +pageSize;
  const skipCount = (page - 1) * pageSize;
  const total = await Blog.find().count();
  const blogs = await Blog.find()
    .select("title body")
    .skip(skipCount)
    .limit(pageSize);
  ctx.body = {
    totalBlogs: total,
    results: blogs,
  };
};
