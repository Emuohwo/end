"use strict";

var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');

dotenv.config();
var pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on('connect', function () {
  console.log('connected to the db');
});
/**
 * Create Party Tables
 */

var createPartyTable = function createPartyTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n        parties(\n            id UUID PRIMARY KEY,\n            name TEXT NOT NULL,\n            hqAddress TEXT NOT NULL,\n            logoUrl TEXT NOT NULL,\n            owner_id UUID NOT NULL,\n            createdDate TIMESTAMP,\n            modifiedDate TIMESTAMP\n            FOREIGN KEY (owner_id) REFERNCES users (id) ON DELETE CASCADE\n        )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
 * Create User Table
 */


var createUserTable = function createUserTable() {
  var queryText = "CREATE TABLE IF NOT EXIST \n    users(\n        id UUID PRIMARY KEY,\n        firstname VARCHAR(128) NOT NULL,\n        lastname VARCHAR(128) NOT NULL,\n        othername VARCHAR(128) NOT NULL,\n        email VARCHAR(128) UNIQUE NOT NULL,\n        password VARCHAR(128) NOT NULL,\n        phoneNumber VARCHAR(128) NOT NULL,\n        passportUrl VARCHAR(255) NOT NULL,\n        isAdmin BOOLEAN NOT NULL\n    )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
 * Drop Party Table
 */


var dropPartyTable = function dropPartyTable() {
  var queryText = 'DROP TABLE IF EXISTS parties returning *';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
 * Drop User Table
 */


var dropUserTable = function dropUserTable() {
  var queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
 * Create All Tables
 */


var createAllTables = function createAllTables() {
  createUserTable();
  createPartyTable();
};
/**
 * Drop All Tables
 */


var dropAllTables = function dropAllTables() {
  dropUserTable();
  dropPartyTable();
};

pool.on('remove', function () {
  console.log('client removed');
  process.exit(0);
});
module.exports = {
  createPartyTable: createPartyTable,
  createUserTable: createUserTable,
  createAllTables: createAllTables,
  dropUserTable: dropUserTable,
  dropPartyTable: dropPartyTable,
  dropAllTables: dropAllTables
};

require('make-runnable');