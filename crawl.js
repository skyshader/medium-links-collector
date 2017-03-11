const Promise = require('bluebird');
const throttledEach = require('./libs/throttledEach');
const Crawler = require('./libs/crawler');
const LinkParser = require('./libs/linkParser');
const storeCSV = require('./libs/storeCSV');
const RECURSIVE_FETCH_TIMES = 1;

let allFetchedLinks = [];

const getLinksFromUrl = (url) => {
  return Promise.coroutine(function*() {
    const crawler = new Crawler(url);
    const body = yield crawler.fetch();

    const linkParser = new LinkParser(body);
    return linkParser.parse();
  })();
};

Promise.coroutine(function*() {
  let links = yield getLinksFromUrl('https://medium.com');
  allFetchedLinks = allFetchedLinks.concat(links);

  let times = RECURSIVE_FETCH_TIMES;

  while(times--) {
    links = yield throttledEach(links, 3, getLinksFromUrl);

    allFetchedLinks = allFetchedLinks.concat(links.filter(function (link) {
      return allFetchedLinks.indexOf(link) < 0;
    }));
  }

  storeCSV(allFetchedLinks);
  console.log('Successfully fetched all links!');
})()
  .catch(err => {
    console.error(err);
  });
