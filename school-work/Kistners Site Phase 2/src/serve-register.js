/** @function serveRegister
  * Endpoint serving the registration page
  * @param {http.IncomingMessage} req - the request object
  * @param {http.ServerResponse} res - the response object
  */
 function serveRegister(req, res) {
    var nav = res.templates.render("_nav.html", {url: req.url});
    var footer = res.templates.render("_footer.html", {});
    var content = res.templates.render("register.html", {});
    var html = res.templates.render("_page.html", {
      page: "Register",
      navigation: nav,
      content: content,
      footer: footer
    });
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  }
  
  module.exports = serveRegister;
  