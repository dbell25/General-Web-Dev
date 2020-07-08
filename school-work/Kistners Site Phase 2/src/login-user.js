/** @function loginUser
 * Parses the request data and redirects the user to their corresponding portal.
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 */
const { parse } = require('querystring');
const { users } = require('../data/database');

function loginUser(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        req.body = parse(body);
        users.login(req.body, function(value, err) {
            if (value !== false) {
                switch(value){
                    case 1: 
                        res.writeHead(301, {Location: '/customer'});
                        res.end();
                        break;
                    case 2: 
                        res.writeHead(301, {Location: '/employee'});
                        res.end();
                        break;
                    case 3:
                        res.writeHead(301, {Location: '/admin'}); 
                        res.end();
                        break;
                    default: 
                        res.writeHead(301, {Location: '/login'}); 
                        res.end();
                }
            } else {
                res.writeHead(301, {Location: '/login'}); 
                res.end();
            }
        });
    });
}
module.exports = loginUser;