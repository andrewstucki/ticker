var util = require('util');

var ApiClientFailure = function(message) {
  Error.call(this);
  this.message = message;
};

var SymbolInvalid = function(message) {
  Error.call(this);
  this.message = message;
};

var errorConstructor = function(type) {
  type.prototype.toString = function(){
    return this.message;
  };
  util.inherits(type, Error);
  return type
}

module.exports = {
  ApiClientFailure: errorConstructor(ApiClientFailure),
  SymbolInvalid: errorConstructor(SymbolInvalid)
};
