const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

module.exports = class Crawler {
  constructor(url) {
    this.url = url;
  }

  fetch() {
    return request(this.url)
      .then((response) => {
        return response.body;
      })
      .catch((err) => {
        console.log('There was some problem fetching the web page:', err);
        throw(err);
      });
  }
};
