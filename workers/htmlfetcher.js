var archive = require('./archive-helpers.js');

archive.readListOfUrls(archive.downloadUrls);
// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

