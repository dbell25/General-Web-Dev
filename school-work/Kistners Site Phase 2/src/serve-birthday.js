const serve500 = require('./serve500');
const db = require('../data/database');

/** @function serveBirthday
 * Endpoint serving the birthday celebration page
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 */
function serveBirthday(req, res) {
  db.arrangements.find(11, (err, arrangement) => {
    if (err) {
      console.log(`Error retrieving arrangements: ${err}`);
      serve500(req, res);
      return;
    }
    let temp = [];
    temp.push(arrangement)
    var arrangementList = res.templates.render("_arrangement-list.html", {
      arrangements: temp
    });
    var nav = res.templates.render("_nav.html", {
      url: req.url
    });
    var footer = res.templates.render("_footer.html", {});
    var content = res.templates.render("birthday.html", {arrangements: arrangementList});
    var html = res.templates.render("_page.html", {
      page: "Birthdays",
      navigation: nav,
      content: content,
      footer: footer
    });
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  });
}
module.exports = serveBirthday;