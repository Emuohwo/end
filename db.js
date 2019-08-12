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
            name TEXT UNIQUE NOT NULL,
            hqAddress TEXT NOT NULL,
            logoUrl TEXT NOT NULL,
            createdDate TIMESTAMP,
            modifiedDate TIMESTAMP
        )`;

        pool.query(queryText)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
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
        phoneNumber VARCHAR(128) UNIQUE NOT NULL,
        passportUrl VARCHAR() UNIQUE NOT NULL,
        isAdmin BOOLEAN NOT NULL DEFAULT false
    )`;

    pool.query(queryText)
    .then((res) => {
        console.log(res);
        // pool.end();
    })
    .catch((err) => {
        console.log(err);
        // pool.end();
    })
};

const createAdminUser = async () => {
    const user = ` INSERT INTO 
    users(firstname, lastname, othername, email, password, phoneNumber, passportUrl, isAdmin ) 
    VALUES('Isaac', 'Warri', 'Emuohwo', 'isaac@ewarri.com',
     '$2b$08$DPJMyv4DkeuMjYys0/91m.3eyA6HPPSFk/K6gpq6Vd4zBS3XrKu3.', 
     '+2347030062542', 'https://avatars1.githubusercontent.com/u/41282717?s=40&v=4', 'true')`;
    pool.query(user)
    .then((res) =>{
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })
}

/**
 * Create Office Table
 */
const createOfficeTable = () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
    offices(
        id UUID PRIMARY KEY,
        type VARCHAR(128) NOT NULL,
        name VARCHAR(128) UNIQUE NOT NULL
    )`;

    pool.query(queryText)
    .then((res) => {
        console.log(res);
        // pool.end();
    })
    .catch((err) => {
        console.log(err);
        // pool.end();
    })
};

/**
 * Create Candidate Table
 */
const createCandidatesTable = () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
    candidates(
        id UUID PRIMARY KEY,
        office UUID NOT NULL REFERENCES offices(id) ON DELETE RESTRICT,
        party UUID NOT NULL FOREIGN KEY  REFERENCES parties(id) ON DELETE RESTRICT,
        candidate UUID NOT NULL UNIQUE FOREIGN KEY  REFERENCES users(id) ON DELETE CASCADE
    )`;

    pool.query(queryText)
    .then((res) => {
        console.log(res);
        // pool.end();
    })
    .catch((err) => {
        console.log(err);
        // pool.end();
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
        createdBy UUID NOT NULL FOREIGN KEY  REFERENCES users(id) ON DELETE RESTRICT,
        office UUID NOT NULL FOREIGN KEY  REFERENCES offices(id) ON DELETE RESTRICT,
        candidate UUID NOT NULL FOREIGN KEY  REFERENCES users(id) ON DELETE CASCADE
    )`;

    pool.query(queryText)
    .then((res) => {
        console.log(res);
        // pool.end();
    })
    .catch((err) => {
        console.log(err);
        // pool.end();
    })
}

const createResultSheet = () => {
    const queryText = ` CREATE TABLE F NOT EXISTS 
    results(
        id INT PRIMARY KEY,
        partylogo TEXT NOT NULL FOREIGN KEY REFERENCES parties(logoUrl) ON DELETE CASCADE,
        officeName UUID NOT FOREIGN KEY REFERENCES offices(id) ON DELETE CASCADE,
        candidate UUID NOT NULL FOREIGN KEY  REFERENCES users(id) ON DELETE CASCADE,
        totalVotes INT NOT NULL DEFAULT 0
    )`
}

createUserTable();
createAdminUser();
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

