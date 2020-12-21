process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  port: process.env.PORT || 8000,
  api: {
    prefix: process.env.API_PREFIX || "/api/v1",
  },
  frontend_api: 'http://monapizza.s3-website-ap-southeast-2.amazonaws.com'
};
