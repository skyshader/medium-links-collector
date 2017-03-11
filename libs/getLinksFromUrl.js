const Promise = require('bluebird');
const Crawler = require('./crawler');
const LinkParser = require('./linkParser');

module.exports = function getLinksFromUrl(url) {
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
