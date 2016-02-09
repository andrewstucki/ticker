var hat = require('hat');
var WebSocketServer = require('websocket').server;
var _ = require('underscore');

var config = require('./config');

var websocket;
var connections = {};
var socketOriginAllowed = function(origin) {
  console.log(origin, config.baseUrl);
  return origin === config.baseUrl;
};

module.exports = {
  removeSymbol: function(symbol) {
    if (!websocket) return;
    for (var key in connections) {
      connections[key].sendUTF(JSON.stringify({
        type: 'remove',
        symbol: symbol
      }));
    }
  },

  addSymbol: function(symbol, data) {
    if (!websocket) return;
    for (var key in connections) {
      connections[key].sendUTF(JSON.stringify({
        type: 'add',
        symbol: symbol,
        data: data
      }));
    }
  },

  createSocket: function(app) {
    if (!!websocket) return;

    websocket = new WebSocketServer({
      httpServer: app,
      fragmentOutgoingMessages: false,
      autoAcceptConnections: false
    });

    websocket.on('request', function(request) {
      if (!socketOriginAllowed(request.origin)) return request.reject();
      var connection = request.accept('ticker', request.origin);
      var id = hat();
      connections[id] = connection;
      connection.on('close', function() {
        delete connections[id]
      });
    });
  }
}
