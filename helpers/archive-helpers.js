var fs = require('fs');
var http = require('http');
var https = require('https');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    data = data.split('\n');
    callback(data);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(urls) { 
    var exists = _.contains(urls, url);
    callback(exists);
  });
};

exports.addUrlToList = function(url, callback) {
  console.log(url, 'url');
  fs.appendFile(exports.paths.list, url + '\n', 'utf-8', (err) => {
    if (err) {
      throw err;
    }
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.access(exports.paths.archivedSites + '/' + url, function (err) {
    if (err) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

exports.downloadUrl = function(url) {
  http.get('http://' + url, function (res) {
    console.log('url', url, 'statusCode', res.statusCode);

    var stream = '';

    res.on('data', function (chunk) {
      stream += chunk;
    }).on('end', function () {

      fs.open(exports.paths.archivedSites + '/' + url, 'w', function (err, fd) {
        if (err) {
          throw err;
        }

        fs.writeFile(exports.paths.archivedSites + '/' + url, stream, (err) => {
          if (err) {
            throw err;
          }
        });
        fs.close(fd, function () { return; }); 
      }); 
    });
  });
};

exports.downloadUrls = function(urls) {
  urls.forEach(function (child) {
    exports.isUrlArchived(child, function (exists) {
      if (!exists) {
        exports.downloadUrl(child);
      }
    });
  });
};
 


