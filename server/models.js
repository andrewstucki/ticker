var promise = require('promise');
var moment = require('moment');
var yql = require('yql');

var config = require("./config");
var errors = require("./errors");
var socket = require("./socket");

var symbolValid = function(symbol) {
  return /^[A-Z]+$/.test(symbol);
};

var now, today, tomorrow, aYearAgo, cache, symbols;
var reset = function() {
  now = moment();
  tomorrow = moment().add(1, 'days').startOf('day').unix();
  today = now.format('YYYY-MM-DD');
  aYearAgo = now.subtract(1, 'years').format('YYYY-MM-DD');
  symbols = [];
  cache = [];
  runJob(tomorrow);
};
var runJob = function(next) {
  setTimeout(function() {
    reset();
  }, next);
};
reset();

var getInfoForSymbol = function(symbol) {
  return new promise(function (resolve, reject) {
    var query = yql('SELECT Date, Close FROM yahoo.finance.historicaldata where (symbol = @symbol) and (startDate = @start) and (endDate = @end)')
    .setParam('symbol', symbol)
    .setParam('start', aYearAgo)
    .setParam('end', today)
    .setConfig('env', 'store://datatables.org/alltableswithkeys').exec(function(err, data) {
      if (err) return reject(err);
      if (!data.query.results) return reject(new errors.SymbolInvalid("Invalid symbol"));
      yql('SELECT Name from yahoo.finance.quote where symbol = @symbol').setParam('symbol', symbol).setConfig('env', 'store://datatables.org/alltableswithkeys').exec(function(err, nameInfo) {
        if (err) return reject(err);
        return resolve({
          data: data.query.results.quote.map(function(data) { return [moment.utc(data.Date).unix()*1000, parseFloat(data.Close)]; }).sort(),
          name: nameInfo.query.results.quote.Name,
          symbol: symbol
        });
      });
    });
  });
};

var getData = function() {
  return new promise(function(resolve, reject) {
    if (cache.length !== 0 || symbols.length === 0) return resolve(cache);
    promise.all(symbols.map(getInfoForSymbol)).then(function(data) {
      cache = data;
      return resolve(data);
    }).catch(reject);
  });
};

var addSymbol = function(symbol) {
  return new promise(function(resolve, reject) {
    if (!symbolValid(symbol)) return reject(new errors.SymbolInvalid("Symbol invalid"));
    if (symbols.indexOf(symbol) !== -1) return reject(new errors.SymbolInvalid("Already added"));
    getInfoForSymbol(symbol).then(function(data) {
      symbols.push(symbol);
      cache.push(data);
      socket.addSymbol(symbol, data);
      return resolve(data);
    }).catch(reject);
  });
};

var removeSymbol = function(symbol) {
  return new promise(function(resolve, reject) {
    var symbolIndex, cacheIndex;
    symbolIndex = symbols.indexOf(symbol);
    if (symbolIndex === -1) return reject(new errors.SymbolInvalid("Not added"));
    for (var i = 0; i < cache.length; i++) {
      if (cache[i].symbol === symbol) {
        cacheIndex = i;
        break;
      }
    }
    symbols.splice(symbolIndex, 1);
    cache.splice(cacheIndex, 1);
    socket.removeSymbol(symbol);
    return resolve(symbol);
  });
};

module.exports = {
  addSymbol: addSymbol,
  removeSymbol: removeSymbol,
  getData: getData,
  getInfoForSymbol: getInfoForSymbol
};
