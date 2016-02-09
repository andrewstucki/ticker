var _ = require("underscore");

var environment = process.env.NODE_ENV || "development";

var config = {
  development: {
    port: 3000,
    baseUrl: "http://localhost:3000"
  },

  test: {
    port: 3000,
    baseUrl: "http://localhost:3000"
  },

  production: {
    port: process.env.PORT,
    baseUrl: process.env.BASE_URL
  }
};

/* istanbul skip next */
if (!(environment in config)) throw new Error("Invalid environment specified: " + environment + "!");

module.exports = _.extend({}, config[environment], {
  environment: environment
});
