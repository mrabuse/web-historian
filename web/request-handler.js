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

        console.log('data', data);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }
  }

  if (method === 'POST') {
    
  }

  // res.end(archive.paths.list);
};
