"use strict";

const getBlog = require("./get");
const createBlog = require("./create");
const updateBlog = require("./update");
const deleteBlog = require("./delete");

module.exports = {
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
