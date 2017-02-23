var archive = require('../helpers/archive-helpers.js');
exports.htmlFetch = function () {
  setInterval(function () { 
    console.log('run fetch');
    archive.readListOfUrls(archive.downloadUrls); 
  }, 60000);
};

// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

