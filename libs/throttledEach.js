const Promise = require('bluebird');
const makeIterator = require('./makeIterator');

module.exports = function throttledEach(collection, maxConcurrent, task) {
  return new Promise((resolve, reject) => {
    if (maxConcurrent <= 0 || !collection) {
      return resolve([]);
    }

    const iterator = makeIterator(collection);
    let finalResult = [];
    let done = false;
    let running = 0;

    function executeTask(element) {
      task(element)
        .then((result) => {
          running -= 1;

          finalResult = finalResult.concat(result);
          console.log('Completed request!', element);

          if (done && running <= 0) {
            return resolve(finalResult);
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
            return resolve(finalResult);
          }

          return;
        }

        running += 1;

        console.log('\nStarting a request!', element);
        console.log('Concurrent requests:', running);
        executeTask(element);
      }
    }

    run();
  });
};
