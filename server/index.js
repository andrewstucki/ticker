var server = require('http').createServer();
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var path = require('path');

var models = require('./models');
var config = require('./config');
var errors = require('./errors');
var socket = require('./socket');

var app = express();
var jsonParser = bodyParser.json();

app.use(express.static('public'));

var router  = express.Router();
app.use('/api/v1', router);

// application core

var invalid = function(res, message) {
  return res.status(422).json({
    error: message || "Invalid"
  });
};

var internalError = function(res) {
  return res.status(500).json({
    error: "Something went wrong"
  });
}

var handleError = function(res, err) {
  if (config.environment !== "test") {
    if (typeof err === "string") {
      console.log(err);
    } else {
      console.log(err.toString());
    }
  }
  if (err instanceof errors.SymbolInvalid) return invalid(res, err.toString());
  return internalError(res);
};

router.get('/data', function(req, res) {
  models.getData().then(function(data) {
    return res.status(200).json(data);
  }).catch(handleError.bind(this, res));
});

router.post('/data', jsonParser, function(req, res) {
  models.addSymbol(req.body.symbol).then(function(data) {
    return res.status(202).json({})
  }).catch(handleError.bind(this, res));
});

router.delete('/data/:symbol', function(req, res) {
  models.removeSymbol(req.params.symbol).then(function(data) {
    return res.status(202).json({})
  }).catch(handleError.bind(this, res));
});

server.on('request', app);
module.exports = server.listen(config.port, function() {
  if (config.environment !== 'test') console.log('Ticker app listening on port ' + config.port + '!');
});

socket.createSocket(server);
