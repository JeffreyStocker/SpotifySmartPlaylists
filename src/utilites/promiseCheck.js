/**
 * This function allow you to modify a JS Promise by adding some status properties.
 * Based on: http://stackoverflow.com/questions/21485545/is-there-a-way-to-tell-if-an-es6-promise-is-fulfilled-rejected-resolved
 * But modified according to the specs of promises : https://promisesaplus.com/
 * from https://ourcodeworld.com/articles/read/317/how-to-check-if-a-javascript-promise-has-been-fulfilled-rejected-or-resolved
 */
export default function MakeQuerablePromise(promise) {
  // Don't modify any promise that has been already modified.
  if (promise.isResolved) return promise;

  // Set initial state
  var isPromise = true;
  var isPending = true;
  var isRejected = false;
  var isFulfilled = false;
  var id = Math.random();
  var storage = {};

  // Observe the promise, saving the fulfillment in a closure scope.
  var result = promise.then(
    function(v) {
      isFulfilled = true;
      isPending = false;
      return v;
    },
    function(e) {
      isRejected = true;
      isPending = false;
      throw e;
    }
  );

  result.isPromise = function() { return isPromise; };
  result.isFulfilled = function() { return isFulfilled; };
  result.isPending = function() { return isPending; };
  result.isRejected = function() { return isRejected; };
  result.getID = function() { return id; };
  result.get = function (key) { return storage[key]}
  result.set = function (key, value) { return storage[key] = value}
  return result;
  }