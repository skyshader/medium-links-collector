const Promise = require('bluebird');
const Crawler = require('./crawler');
const LinkParser = require('./linkParser');

module.exports = function getLinksFromUrl(url, cb) {
  return Promise.coroutine(function*() {
    console.log('\nFetching url:', url);

    const crawler = new Crawler(url);
    const body = yield crawler.fetch();

    const linkParser = new LinkParser(body);
    const links = linkParser.parse();

    console.log('Fetched successfully!', url);

    if (cb) {
      return cb(null, links);
    }

    return links;
  })()
    .catch((err) => {
      console.log('Error in fetching url:', err.message);

      if (cb) {
        return cb(err);
      }

      return [];
    });
};
