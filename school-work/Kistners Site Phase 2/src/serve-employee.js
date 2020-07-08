/** @function serveEmployee
 * Endpoint serving the employee portal
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 */
function serveEmployee(req, res) {
    var nav = res.templates.render("_nav.html", {url: req.url});
    var footer = res.templates.render("_footer.html", {});
    var content = res.templates.render("employee.html", {});
    var html = res.templates.render("_page.html", {
      page: "Employee",
      navigation: nav,
      content: content,
      footer: footer
    });
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  }
  
  module.exports = serveEmployee;
  