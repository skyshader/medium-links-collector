const fs = require('fs');

module.exports = function storeCSV(array) {
  const file = fs.createWriteStream(__dirname + '/../output/links.csv');
  file.on('error', function(err) { throw err; });
  file.write(array.join(', ') + '\n');
  file.end();
};
