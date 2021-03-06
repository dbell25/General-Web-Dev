/** @function serveUpdatePassword
  * Endpoint serving the update password page
  * @param {http.IncomingMessage} req - the request object
  * @param {http.ServerResponse} res - the response object
  */
 function serveUpdatePassword(req, res) {
    var nav = res.templates.render("_nav.html", {url: req.url});
    var footer = res.templates.render("_footer.html", {});
    var content = res.templates.render("update-password.html", {});
    var html = res.templates.render("_page.html", {
      page: "update-password",
      navigation: nav,
      content: content,
      footer: footer
    });
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  }
  
  module.exports = serveUpdatePassword;
  