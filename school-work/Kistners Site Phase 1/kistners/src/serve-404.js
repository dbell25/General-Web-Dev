/*
* Serves a 404 message when the requested page is not found.
*/
function serve404(req, res) {
    res.statusCode = 404;
    res.statusMessage = "Not Found";
    res.end();
}
  
module.exports = serve404;