const Promise = require('bluebird');
const throttledEach = require('./libs/throttledEach');
const getLinksFromUrl = require('./libs/getLinksFromUrl');
const storeCSV = require('./libs/storeCSV');

const RECURSIVE_FETCH_LIMIT = 2;
const CONCURRENT_REQUEST_LIMIT = 5;
let allFetchedLinks = [];

Promise.coroutine(function*() {
  let links = yield getLinksFromUrl('https://medium.com');
  allFetchedLinks = allFetchedLinks.concat(links);

  let times = RECURSIVE_FETCH_LIMIT;

  while(times--) {
    links = yield throttledEach(links, CONCURRENT_REQUEST_LIMIT, getLinksFromUrl);

    links = [].concat.apply([], links);

    links = links.filter((link) => {
      return allFetchedLinks.indexOf(link) < 0;
    });

    allFetchedLinks = allFetchedLinks.concat(links);
  }

  yield storeCSV(allFetchedLinks);
  console.log('Successfully fetched all links!', allFetchedLinks.length);
})()
  .catch(err => {
    console.error(err);
  });
