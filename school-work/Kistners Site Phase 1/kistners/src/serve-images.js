const { join } = require('path');
var fs = require('fs');

function serveImages(req, res){
  const filePath = join(__dirname, '..', 'public', 'images', req.params.filename);
    fs.readFile(filePath, (err, data) => {
      if(err) {
        res.statusCode = 404;
      } else {
        res.setHeader('Content-Type', 'image/jpg');
        res.write(data);
      }
      res.end();
    });
}

module.exports = serveImages;