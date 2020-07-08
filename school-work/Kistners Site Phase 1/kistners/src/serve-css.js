const { join } = require('path');
var fs = require('fs');

/*
* reads in and serves the requested CSS file.
*/
function serveCss(req, res) {
    const filePath = join(__dirname, 'css', req.params.filename);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 404;
        } else {
            res.setHeader('Content-Type', 'text/css');
            res.write(data);
        }
        res.end();
    });
}

module.exports = serveCss;