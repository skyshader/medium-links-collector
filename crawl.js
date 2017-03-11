// const Promise = require('bluebird');
const Crawler = require('./libs/crawler');
const LinkParser = require('./libs/linkParser');

const crawler = new Crawler('https://medium.com');
crawler.fetch()
  .then(body => {
    const linkParser = new LinkParser(body);
    return linkParser.parse();
  })
  .then(links => {
    console.log(links);
  });

// const throttledEach = require('./libs/throttledEach');

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
//
// const executor = (elem) => {
//   return new Promise((resolve) => {
//     console.log('Executing task for elem:', elem);
//
//     setTimeout(() => {
//       console.log('Execution completed for elem:', elem);
//       return resolve();
//     }, 2000);
//   });
// };
//
// throttledEach(arr, 3, executor)
//   .then(() => {
//     console.log('All tasks completed successfully!');
//   });
