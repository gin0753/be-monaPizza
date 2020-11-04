"use strict";

const mongoose = require("mongoose");

const BlogSchema = {
  title: String,
  body: String,
};

module.exports = mongoose.model("Blog", BlogSchema);
