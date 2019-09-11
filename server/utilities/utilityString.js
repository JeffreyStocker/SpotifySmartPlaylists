const toString64 = function (str) {
  return new Buffer(str).toString('base64');
}


module.exports = {
  toString64
}