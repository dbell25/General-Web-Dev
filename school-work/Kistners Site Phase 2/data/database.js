var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/flowers.db');
var users = {};
const bcrypt = require('bcrypt');
const saltRounds = 10;

/** @typedef ArrangementData {Object}
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string[]} photo_ids
 */

var arrangements = {}

/*
 * Creates the users table in the database.
 */
db.run(
  `CREATE TABLE IF NOT EXISTS users(
    userID INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    accessLevel INTEGER NOT NULL
  )`
);

/** @callback Images~featuredCallback
 * @param {Exception|string} err - the error (if any)
 * @param {ArrangementData[]} arrangementData - the arrangment data
 */
/** @function arrangements.featured
 * Retrieves the requested arrangement
 * @param {integer} count - the number of featured arrangments requested
 * @param {Images~featuredCallback} callback - the callback to invoke
 */
arrangements.featured = function (count, callback) {
  var sql = `SELECT arrangements.id, name, description,
              GROUP_CONCAT(arrangements_photos.id) AS photo_ids
              FROM arrangements LEFT JOIN arrangements_photos
              ON arrangements.id = arrangements_photos.arrangement_id
              GROUP BY arrangements.id;`
  db.all(sql, (err, rows) => {
    // Preprocess photo_ids from a string to an array
    rows.map(row => {
      row.photo_ids = row.photo_ids ? row.photo_ids.split(",") : []
    });
    // If more arrangements were requested than available,
    // send all we have
    if (rows < count) return callback(rows);
    // Ohterwise, pick [count] random items from the array
    var selected = [];
    var selectedIds = [];
    // Invariant - still need to pick more elements
    while (selected.length < count) {
      var id = Math.floor(Math.random() * rows.length);
      // make sure we haven't already added this id
      if (!selectedIds.includes(id)) {
        selected.push(rows[id]);
        selectedIds.push(id);
      }
    }
    callback(err, selected);
  });
}

/** @callback Images~findCallback
 * @param {Exception|string} err - the error (if any)
 * @param {ArrangementData[]} arrangementData - the arrangment data
 */
/** @function arrangements.find
 * Retrieves the requested arrangement
 * @param {integer} id - the id of the requested arrangement
 * @param {Images~findCallback} callback - the callback to invoke
 */
arrangements.find = function (id, callback) {
  var sql = `SELECT arrangements.id, name, description,
              GROUP_CONCAT(arrangements_photos.id) AS photo_ids
              FROM arrangements LEFT JOIN arrangements_photos
              ON arrangements.id = arrangements_photos.arrangement_id
              WHERE arrangements.id = ?
              GROUP BY arrangements.id;`;
  db.get(sql, id, (err, row) => {
    // Check for errors
    if (err) return callback(err);
    if (!row) return callback("Not Found");
    // Preprocess photo_ids from a string to an array
    row.photo_ids = row.photo_ids ? row.photo_ids.split(",") : [];
    // Send the result
    callback(false, row);
  });
}

/** @callback Arrangements~createCallback
 * @param {Exception|string} err - the error (if any)
 */
/** @function arrangements.create
 * Creates a new arrangment in the database
 * @param {ArrangementData} arrangementData - the arrangement to add
 * @param {Arrangements~createCallback} callback
 */
arrangements.create = function (arrangementData, callback) {
  // Step 1: Insert into arrangements table
  db.run("INSERT INTO arrangements (name, description) VALUES (?, ?)",
    arrangementData.name,
    arrangementData.description,
    function (err) {
      // On error, invoke callback and stop execution
      if (err) return callback(err);
      // Step 2: Insert into arrangments_photos table
      db.run("INSERT INTO arrangements_photos (arrangement_id, filename, mime_type, data) VALUES (?, ?, ?, ?)",
        this.lastID, // node-sqlite3 saves the last generated id to the context in an INSERT callback
        arrangementData.image.filename,
        arrangementData.image.contentType,
        arrangementData.image.data,
        function (err) {
          // On error, invoke callback and stop execution
          if (err) return callback(err);
          // Otherwise, invoke callback with no error
          else return callback("successful");
        }
      );
    }
  );
}

/** @callback Arrangements~updateCallback
 * @param {Exception|string} err - the error (if any)
 */
/** @function arrangements.update
 * Updates an existing arrangment in the database
 * @param {ArrangementData} arrangementData - the arrangement to add
 * @param {Arrangements~updateCallback} callback
 */
arrangements.update = function (arrangementData, callback) {
  // Update arrangements table
  db.run("UPDATE arrangements SET name = ?, description = ? WHERE id = ?",
    arrangementData.name,
    arrangementData.description,
    arrangementData.id,
    function (err) {
      // On error, invoke callback and stop execution
      if (err) return callback(false);
      // Otherwise, invoke callback with no error
      else return callback(true);
    }
  );
}


/** @typedef ArrangementImageData {Object}
 * @property {string} id
 * @property {string} filename
 * @property {string} mime_type
 * @property {Buffer} data
 */

var arrangementImages = {}

/** @callback ArrangementImages~findCallback
 * @param {Exception|string} err - the error (if any)
 * @param {ArrangementImageData} imageData - the arrangment image data
 */
/** @function arrangementImages.find
 * Retrieves the requested arrangement
 * @param {integer} id - the id of the requested arrangement
 * @param {ArrangementImages~findCallback} callback - the callback to invoke
 */
arrangementImages.find = function (id, callback) {
  db.get("SELECT * FROM arrangements_photos WHERE id = ?;", id, (err, row) => {
    if (err) console.error(err);
    callback(err, row);
  });
}

/** @function users.create
 * Creates a new user in the database
 * @param {ArrangementData} userData - the arrangement to add
 * @param {Arrangements~createCallback} callback
 */
users.create = function (userData, callback) {
  var salt = bcrypt.genSaltSync(saltRounds);
  var hashedPassword = bcrypt.hashSync(userData.password, salt);

  db.run("INSERT INTO users (firstName, lastName, email, password, phone, accessLevel) VALUES (?, ?, ?, ?, ?, ?)",
    userData.fname,
    userData.lname,
    userData.email,
    hashedPassword,
    userData.phone,
    userData.accessLevel,

    function (err, res) {
      if (err) return callback(err);
      else return callback(userData);
    }
  );
}

/** @function users.login
 * Checks the database for a matching user
 * @param {ArrangementData} userData - the arrangement to add
 * @param {Arrangements~createCallback} callback
 */
users.login = (userData, callback) => {
  if (userData.password === undefined) return callback(false);
  db.get("SELECT * FROM users WHERE email = ?;", userData.email, (err, data) => {
    try {
      bcrypt.compare(userData.password, data.password, function (err, res) {
        if (res) return callback(data.accessLevel);
        else return callback(false);
      })
    } catch {
      return callback(false);
    }
  });
}

/** @function users.updatePassword
 * Updates the password field given a user's login information and new password
 * @param {ArrangementData} userData - the arrangement to add
 * @param {Arrangements~createCallback} callback
 */
users.updatePassword = (userData, callback) => {
  users.login(userData, function (value, err) {
    if (value !== false) {
      try {
        var salt = bcrypt.genSaltSync(saltRounds);
        var hashedPassword = bcrypt.hashSync(userData.newPassword, salt);
        db.run("UPDATE users SET password = ? WHERE email = ?;",
          hashedPassword,
          userData.email,

          function (err, res) {
            if (err) return callback(err);
            else return callback("Updated successfully!");
          }
        );
      }
      catch{
        callback("Something went wrong.");
      }
    }
    else{
      callback("Invalid Login Credentials.");
    }
  });
}

module.exports = {
  arrangements,
  arrangementImages,
  users
}