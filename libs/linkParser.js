const cheerio = require('cheerio');
let $ = null;

module.exports = class LinkParser {
  constructor(html) {
    $ = cheerio.load(html);
  }

  parse() {
    const links = [];
    const linkTags = $('a');
    linkTags.each((i, link) => {
      const url = $(link).attr('href');
      if (/^https:\/\/medium.com/.test(url) && links.indexOf(url) < 0) {
        links.push(url);
      }
    });
    return links;
  }
};
