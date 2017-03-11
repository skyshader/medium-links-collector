const Promise = require('bluebird');
const throttledEach = require('./libs/throttledEach');
const Crawler = require('./libs/crawler');
const LinkParser = require('./libs/linkParser');
const storeCSV = require('./libs/storeCSV');
const RECURSIVE_FETCH_TIMES = 2;
const CONCURRENT_REQUESTS = 5;

let allFetchedLinks = [];

const getLinksFromUrl = (url) => {
  return Promise.coroutine(function*() {
    const crawler = new Crawler(url);
    const body = yield crawler.fetch();

    const linkParser = new LinkParser(body);
    return linkParser.parse();
  })()
    .catch((err) => {
      console.log('Error in fetching url:', err.message);
      return [];
    });
};

Promise.coroutine(function*() {
  let links = yield getLinksFromUrl('https://medium.com');
  allFetchedLinks = allFetchedLinks.concat(links);

  let times = RECURSIVE_FETCH_TIMES;

  while(times--) {
    links = yield throttledEach(links, CONCURRENT_REQUESTS, getLinksFromUrl);

    links = links.filter(function (link) {
      return allFetchedLinks.indexOf(link) < 0;
    });

    allFetchedLinks = allFetchedLinks.concat(links);
  }

  storeCSV(allFetchedLinks);
  console.log('Successfully fetched all links!', allFetchedLinks.length);
})()
  .catch(err => {
    console.error(err);
  });
