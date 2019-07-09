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
            createdDate TIMESTAMP,
            modifiedDate TIMESTAMP
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

/**
 * Create Office Table
 */
const createOfficeTable = () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
    offices(
        id UUID PRIMARY KEY,
        type VARCHAR(128) NOT NULL,
        name VARCHAR(128) NOT NULL
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
}

/**
 * Create Candidate Table
 */
const createCandidatesTable = () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
    candidates(
        id UUID PRIMARY KEY,
        office UUID NOT NULL REFERENCES offices(id) ON DELETE RESTRICT,
        party UUID NOT NULL REFERENCES parties(id) ON DELETE RESTRICT,
        candidate UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
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
}

/**
 * Create Vote Table
 */
const createVotesTable = () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
    votes(
        id UUID PRIMARY KEY,
        createdOn TIMESTAMP NOT NULL,
        createdBy UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
        office UUID NOT NULL REFERENCES offices(id) ON DELETE RESTRICT,
        candidate UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
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
}

createUserTable();
createPartyTable();
createOfficeTable();
createCandidatesTable();
createVotesTable();

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

