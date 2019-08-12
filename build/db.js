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
  var queryText = "CREATE TABLE IF NOT EXISTS\n        parties(\n            id UUID PRIMARY KEY,\n            name TEXT NOT NULL,\n            hqAddress TEXT NOT NULL,\n            logoUrl TEXT NOT NULL,\n            createdDate TIMESTAMP,\n            modifiedDate TIMESTAMP\n        )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err); // pool.end();
  });
};
/**
 * Create User Table
 */


var createUserTable = function createUserTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n    users(\n        id UUID PRIMARY KEY,\n        firstname VARCHAR(128) NOT NULL,\n        lastname VARCHAR(128) NOT NULL,\n        othername VARCHAR(128) NOT NULL,\n        email VARCHAR(128) UNIQUE NOT NULL,\n        password VARCHAR(128) NOT NULL,\n        phoneNumber VARCHAR(128) NOT NULL,\n        passportUrl VARCHAR(255) NOT NULL,\n        isAdmin BOOLEAN NOT NULL\n    )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err); // pool.end();
  });
};
/**
 * Create Office Table
 */


var createOfficeTable = function createOfficeTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS \n    offices(\n        id UUID PRIMARY KEY,\n        type VARCHAR(128) NOT NULL,\n        name VARCHAR(128) UNIQUE NOT NULL\n    )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err); // pool.end();
  });
};
/**
 * Create Candidate Table
 */


var createCandidatesTable = function createCandidatesTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS \n    candidates(\n        id UUID PRIMARY KEY,\n        office UUID NOT NULL REFERENCES offices(id) ON DELETE RESTRICT,\n        party UUID NOT NULL REFERENCES parties(id) ON DELETE RESTRICT,\n        candidate UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE\n    )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err); // pool.end();
  });
};
/**
 * Create Vote Table
 */


var createVotesTable = function createVotesTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS \n    votes(\n        id UUID PRIMARY KEY,\n        createdOn TIMESTAMP NOT NULL,\n        createdBy UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,\n        office UUID NOT NULL REFERENCES offices(id) ON DELETE RESTRICT,\n        candidate UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE\n    )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err); // pool.end();
  });
};

createUserTable();
createPartyTable();
createOfficeTable();
createCandidatesTable();
createVotesTable(); // /**
//  * Drop Party Table
//  */
// const dropPartyTable = () => {
//     const queryText = 'DROP TABLE IF EXISTS parties returning *';
//     pool.query(queryText)
//     .then((res) => {
//         console.log(res);
//         pool.end();
//     })
//     .catch((err) => {
//         console.log(err);
//         pool.end();
//     });
// }
// /**
//  * Drop Office Table
//  */
// const dropOfficeTable = () => {
//     const queryText = 'DROP TABLE IF EXISTS parties returning *';
//     pool.query(queryText)
//     .then((res) => {
//         console.log(res);
//         pool.end();
//     })
//     .catch((err) => {
//         console.log(err);
//         pool.end();
//     });
// }
// /**
//  * Drop User Table
//  */
// const dropUserTable = () => {
//     const queryText = 'DROP TABLE IF EXISTS users returning *';
//     pool.query(queryText)
//     .then((res) => {
//         console.log(res);
//         pool.end();
//     })
//     .catch((err) => {
//         console.log(err);
//         pool.end();
//     });
// }
// /**
//  * Create All Tables
//  */
// const createAllTables = () => {
//     createUserTable();
//     createPartyTable();
// createOfficeTable();
// }
// /**
//  * Drop All Tables
//  */
// const dropAllTables = () => {
//     dropUserTable();
//     dropPartyTable();
//     dropOfficeTable();
// }
// createAllTables();
// pool.on('remove', () => {
//     console.log('client removed');
//     process.exit(0);
// });
// module.exports = {
//     createPartyTable,
// createOfficeTable,
//     createUserTable,
//     createAllTables,
//     dropUserTable,
//     dropPartyTable,
// dropOfficeTable
//     dropAllTables
// };
// require('make-runnable');