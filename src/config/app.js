process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  port: process.env.PORT || 'https://protected-scrubland-99331.herokuapp.com',
  api: {
    prefix: process.env.API_PREFIX || "/api/v1",
  },
};
