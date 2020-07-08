const serve500 = require('./serve500');
const db = require('../data/database');

/** @function serveWeddings
 * Endpoint serving the wedding page
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 */
function serveWeddings(req, res) {
  db.arrangements.featured(2, (err, arrangements) => {
    if (err) {
      console.log(`Error retrieving arrangements: ${err}`);
      serve500(req, res);
      return;
    }
    var arrangementList = res.templates.render("_arrangement-list.html", {arrangements: arrangements});
    var nav = res.templates.render("_nav.html", {
      url: req.url
    });
    var footer = res.templates.render("_footer.html", {});
    var content = res.templates.render("weddings.html", {arrangements: arrangementList});
    var html = res.templates.render("_page.html", {
      page: "Weddings",
      navigation: nav,
      content: content,
      footer: footer
    });
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  });
}

module.exports = serveWeddings;