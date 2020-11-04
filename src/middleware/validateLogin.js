"use strict";

module.exports = (ctx, next) => {
  const login = true;
  if (login) {
    return next();
  } else {
    ctx.body = {
      message: "not login",
    };
  }
};
