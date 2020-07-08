/** @function createtArrangements
 * Parses the request data and passes the data to database.js
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 */
const parseBody = require('../lib/parse-body');
const { arrangements } = require('../data/database');

function createArrangement(req, res) {
    try {
        parseBody(req, res, function (data) {
            arrangements.create(data.body, function (data) {
                if(data === "successful" ) res.end("Uploaded Successfully!");
                else res.end("Upload Failed. Please try again");
            })
        });
    }
    catch{
        res.end("Something went wrong.");
    }
}

module.exports = createArrangement;