 class Route {
    constructor(pattern, handler) {
      const patternParts = pattern.split('/');
      this.handler = handler;
      this.keys = [];

      var expString = patternParts.map((part) => {
        if(part.charAt(0) == ':') {
          this.keys.push(part.slice(1));
          return '([^/]+)';
        } 
        else return part;
      });
  
      this.regexp = new RegExp(`^${ expString.join('/') }$`);
    }
    
    match(url) {
      const match = this.regexp.exec(url);
      if(!match) return null;
       
      var params = {};
      this.keys.forEach((key, i) => {
        params[key] = match[i+1];
      });
      
      return params;
    }
  }

  module.exports = Route;