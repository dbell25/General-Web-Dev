/** @function arrangementSearch
 * Endpoint serving the Search Arrangements page
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 */
const parseBody = require('../lib/parse-body');
const { arrangements } = require('../data/database');

function arrangementSearch(req, res) {
    try {
        parseBody(req, res, function (data) {
            arrangements.find(data.body.id, function (err, arrangement) {
                var nav = res.templates.render("_nav.html", { url: req.url });
                var footer = res.templates.render("_footer.html", {});
                var content = res.templates.render("arrangement-edit.html", { arrangement: arrangement });
                var html = res.templates.render("_page.html", {
                    page: "Edit Arrangement",
                    navigation: nav,
                    content: content,
                    footer: footer
                });
                res.setHeader("Content-Type", "text/html");
                res.end(html);
            });
        });
    } catch {
        res.end("Something went wrong.");
    }
}

module.exports = arrangementSearch;