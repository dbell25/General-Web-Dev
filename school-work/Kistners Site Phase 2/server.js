var http = require('http');
const Router = require('./lib/router');
const Templates = require('./lib/templates');
const serveFile = require('./src/serve-file');
const serveHome = require('./src/serve-home');
const serveLogin = require('./src/serve-login');
const serveRegister = require('./src/serve-register');
const serveRegisterAdmin = require('./src/serve-register-admin');
const serveCustomer = require('./src/serve-customer');
const serveEmployee = require('./src/serve-employee');
const serveAdmin = require('./src/serve-admin');
const serveAnniversary = require('./src/serve-anniversary');
const serveBaby = require('./src/serve-baby');
const serveBirthday = require('./src/serve-birthday');
const serveProm = require('./src/serve-prom');
const serveSororitySisterhood = require('./src/serve-sorority-sisterhood');
const serveSympathy = require('./src/serve-sympathy');
const serveWedding = require('./src/serve-wedding');
const serveArrangement = require('./src/serve-arrangement');
const arrangementSearch = require('./src/arrangement-search');
const serveArrangementCreate = require('./src/serve-arrangment-create');
const serveArrangementImage = require('./src/serve-arrangement-image');
const serve404 = require('./src/serve404');
const createUser = require('./src/create-user');
const createUserAdmin = require('./src/create-user-admin');
const createArrangement = require('./src/arrangement-create');
const serveArrangementSearch = require('./src/serve-arrangement-search');
const loginUser = require('./src/login-user');
const updatePassword = require('./src/update-password');
const servePasswordUpdate = require('./src/serve-update-password');
const editArrangement = require('./src/arrangement-edit');

const PORT = 3000;

var router = new Router(serve404);
var templates = new Templates("./templates");

router.addRoute("GET", "/static/:filename", serveFile);
router.addRoute("GET", "/", serveHome);
router.addRoute("GET", "/index", serveHome);
router.addRoute("GET", "/index.html", serveHome);
router.addRoute("GET", "/login", serveLogin);
router.addRoute("GET", "/register", serveRegister);
router.addRoute("GET", "/register-admin", serveRegisterAdmin);
router.addRoute("GET", "/anniversary", serveAnniversary);
router.addRoute("GET", "/baby", serveBaby);
router.addRoute("GET", "/birthday", serveBirthday);
router.addRoute("GET", "/prom", serveProm);
router.addRoute("GET", "/sorority-sisterhood", serveSororitySisterhood);
router.addRoute("GET", "/sympathy", serveSympathy);
router.addRoute("GET", "/weddings", serveWedding);
router.addRoute("GET", "/arrangements/:id", serveArrangement);
router.addRoute("GET", "/arrangement-images/:id", serveArrangementImage);
router.addRoute("GET", "/admin", serveAdmin);
router.addRoute("GET", "/employee", serveEmployee);
router.addRoute("GET", "/customer", serveCustomer);
router.addRoute("GET", "/arrangement-create", serveArrangementCreate);
router.addRoute("GET", "/arrangement-search", serveArrangementSearch);
router.addRoute("GET", "/update-password", servePasswordUpdate);
router.addRoute("POST", "/update-password", updatePassword);
router.addRoute("POST", "/register", createUser);
router.addRoute("POST", "/register-admin", createUserAdmin);
router.addRoute("POST", "/login", loginUser);
router.addRoute("POST", "/arrangement-create", createArrangement);
router.addRoute("POST", "/arrangement-search", arrangementSearch);
router.addRoute("POST", "/arrangement-edit", editArrangement);

// Setup http server
var server = http.createServer((req, res) => {
  // Attach the template library to the response
  res.templates = templates;
  // TODO: Attach the database to the response
  router.route(req, res);
});

// Begin listening for requests
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});