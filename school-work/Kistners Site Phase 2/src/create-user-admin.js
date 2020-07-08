/** @function createUserAdmin
 * Parses the request data and passes the data to database.js
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 */
const { parse } = require('querystring');
const { users } = require('../data/database');

function createUserAdmin(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        req.body = parse(body);
        users.create(req.body, function(data, err) {
            if (err) {
                res.writeHead(301, {Location: '/register'});
                res.end(JSON.stringify(err));
            } else {
                res.writeHead(301, {Location: '/admin'});
                res.end();
            }
        })
    });
}
module.exports = createUserAdmin;