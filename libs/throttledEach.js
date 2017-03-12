const Promise = require('bluebird');
const async = require('async');

module.exports = function throttledEach(collection, limit, executor) {
  return new Promise((resolve, reject) => {
    async.mapLimit(collection, limit, executor, (err, result) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};
