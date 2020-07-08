var http = require('http');
var port = 3000;
var serveIndex = require('./src/serve-index');
var serveCss = require('./src/serve-css');
var serveImages = require('./src/serve-images');
var serve404 = require('./src/serve-404');
var Templates = require('./lib/templates');
var Router = require('./lib/router'); 
var router = new Router(serve404);
var templates = new Templates();

/*
* Adds routes to the value of router. By default serve404 is called.
*/
router.addRoute('GET', '/', serveIndex);
router.addRoute('GET', '/css/:filename', serveCss);
router.addRoute('GET', '/images/:filename', serveImages);

/*
* Creates the HTTP server.
*/
const server = http.createServer((req, res)=>{
  req.templates = templates;
  router.route(req, res);
});

/*
* Sets the HTTP server to listen on the value of port.
*/
server.listen(port, (err) => {
  if (err) {
    return console.log('An error has occurred', err);
  }
  console.log(`Listening on port ${port}`);
});
