/** @function serveArrangmentCreate
  * Endpoint serving the login page
  * @param {http.IncomingMessage} req - the request object
  * @param {http.ServerResponse} res - the response object
  */
 function serveArrangmentCreate(req, res) {
    var nav = res.templates.render("_nav.html", {url: req.url});
    var footer = res.templates.render("_footer.html", {});
    var content = res.templates.render("arrangement-create.html", {});
    var html = res.templates.render("_page.html", {
      page: "Create Arrangement",
      navigation: nav,
      content: content,
      footer: footer
    });
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  }
  
  module.exports = serveArrangmentCreate;
  