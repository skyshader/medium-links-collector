const Promise = require('bluebird');
const makeIterator = require('./makeIterator');

module.exports = function throttledEach(collection, maxConcurrent, task) {
  return new Promise((resolve, reject) => {
    if (maxConcurrent <= 0 || !collection) {
      return resolve();
    }

    const iterator = makeIterator(collection);
    let done = false;
    let running = 0;

    function executeTask(element) {
      task(element)
        .then(() => {
          running -= 1;

          if (done && running <= 0) {
            return resolve();
          }

          run();
        })
        .catch(err => {
          done = true;
          return reject(err);
        });
    }

    function run() {
      while (running < maxConcurrent && !done) {
        const element = iterator.next();

        if (element === null) {
          done = true;
          if (running <= 0) {
            return resolve();
          }

          return;
        }

        running += 1;
        executeTask(element);
      }
    }

    run();
  });
};
