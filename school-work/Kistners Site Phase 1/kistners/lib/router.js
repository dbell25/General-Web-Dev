const Route = require('./route');

class Router {
  constructor(notFound) {
    this.routes = {};
    this.notFound = notFound;
    this.route = this.route.bind(this);
  }

  addRoute(method, pattern, handler) {
    if(!this.routes[method]) this.routes[method] = [];
    this.routes[method].push(new Route(pattern, handler));
  }

  route(req, res) {
    if(!this.routes[req.method]) return this.notFound(req, res);
    for(var i = 0; i < this.routes[req.method].length; i++) {
      var route = this.routes[req.method][i];
      var match = route.match(req.url);
      if(match) {
        req.params = match;
        return route.handler(req, res);
      }
    }
    return this.notFound(req, res);
  }
}

module.exports = Router;