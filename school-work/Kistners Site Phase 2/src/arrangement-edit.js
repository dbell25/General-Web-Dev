/** @function editArrangements
 * Parses the request data and passes the data to database.js
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 */
const parseBody = require('../lib/parse-body');
const { arrangements } = require('../data/database');

function editArrangement(req, res) {
    try {
        parseBody(req, res, function (data) {
            arrangements.update(data.body, function (data) {
                if(data) res.end("Updated Successfully!");
                else res.end("Upload Failed. Please try again");
            });
        });
    }
    catch{
        res.end("Something went wrong.");
    }
}
module.exports = editArrangement;