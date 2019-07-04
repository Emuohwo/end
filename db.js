const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to the db');
});

/**
 * Create Party Tables
 */
const createPartyTable = () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS
        parties(
            id UUID PRIMARY KEY,
            name TEXT NOT NULL,
            hqAddress TEXT NOT NULL,
            logoUrl TEXT NOT NULL,
            owner_id UUID NOT NULL,
            createdDate TIMESTAMP,
            modifiedDate TIMESTAMP
            FOREIGN KEY (owner_id) REFERNCES users (id) ON DELETE CASCADE
        )`;

        pool.query(queryText)
            .then((res) => {
                console.log(res, "I am here");
                pool.end();
            })
            .catch((err) => {
                console.log(err, "****************");
                pool.end();
            })
};


/**
 * Create User Table
 */
const createUserTable = () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS
    users(
        id UUID PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        othername VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        phoneNumber VARCHAR(128) NOT NULL,
        passportUrl VARCHAR(255) NOT NULL,
        isAdmin BOOLEAN NOT NULL
    )`;

    pool.query(queryText)
    .then((res) => {
        console.log(res);
        pool.end();
    })
    .catch((err) => {
        console.log(err);
        pool.end();
    })
};

createUserTable();
createPartyTable();

// /**
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
// }
// /**
//  * Drop All Tables
//  */
// const dropAllTables = () => {
//     dropUserTable();
//     dropPartyTable();
// }

// createAllTables();

// pool.on('remove', () => {
//     console.log('client removed');
//     process.exit(0);
// });

// module.exports = {
//     createPartyTable,
//     createUserTable,
//     createAllTables,
//     dropUserTable,
//     dropPartyTable,
//     dropAllTables
// };

// require('make-runnable');

