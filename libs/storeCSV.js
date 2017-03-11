const fs = require('fs');
const Promise = require('bluebird');
const filePath = __dirname + '/../output/links.csv';

module.exports = function storeCSV(array) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    file.on('error', function(err) { reject(err); });
    file.write(array.join(', ') + '\n');
    file.end();
    resolve();
  });
};
