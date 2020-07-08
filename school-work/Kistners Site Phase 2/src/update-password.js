/** @function updatePassword
 * Parses the request data and updates the user password in database.js 
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 */
const { parse } = require('querystring');
const { users } = require('../data/database');

function updatePassword(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        req.body = parse(body);
        users.updatePassword(req.body, function(value, err) {
            if (value !== false) {
                res.end(value);
            } else {
                res.end("Account Not Found!");
            }
        });
    });
}
module.exports = updatePassword;