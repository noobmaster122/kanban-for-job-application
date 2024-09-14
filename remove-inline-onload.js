const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'dist', 'application-hunter-extension', 'index.html');

fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    return console.error(err);
  }
  const result = data.replace(/media="print" onload="this\.media='all'"/g, 'media="all"');

  fs.writeFile(indexPath, result, 'utf8', (err) => {
    if (err) return console.error(err);
  });
});