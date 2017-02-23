var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
//var _ = require('underscore';)
//may need to put fs in here 

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var method = req.method;

  // if (method === 'GET' && req.url === '/') {
  //   server.route()

  // }
  
  if (method === 'GET') {
    if (req.url === '/') {
      fs.readFile('/Volumes/Student/hratx25-web-historian/web/public/index.html', 'utf-8', (err, data) => {
        if (err) {
          throw err;
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }
  }

  if (method === 'POST') {
    var data = '';
    req.on('data', function(chunk) {
      data += chunk;
    }).on('end', function() {
      console.log('data', data);
      archive.isUrlInList(data, function(exists) {
        if (exists) {
          console.log('exists', data);
        } else {
          console.log('no exist', data);
          archive.addUrlToList(data, function () {
            fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf-8', (err, data) => {
              if (err) {
                throw err;
              }
              res.writeHead(302, {'Content-Type': 'text/html'});
              res.write(data);
              res.end();
            });
          });
        } 
      });
    });

    //check if url is in sites.txt
    //archive.isUrlInList()
      //if it is there
        //check if it is archived
          //if we have not archived the url
            //send them to loadinghtml
          //if we have archived url
            //send them web page
      //if it is not in sites.txt
        //add it to sites.text
        //send user to loadinghtml
  }

  // res.end(archive.paths.list);
};
