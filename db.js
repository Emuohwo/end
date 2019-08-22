const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
    console.log('connected to db')
});

const createType = async () => {
    const type = `
    CREATE TYPE status AS ENUM('approved', 'pending', 'rejected');
   `;
  
    pool.query(type)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

const createAdminUser = async () => {
    const queryText = ` INSERT INTO 
    users(firstname, lastname, othernames, email, password, phonenumber, passporturl, isAdmin ) 
    VALUES('Isaac', 'Warri', 'Emuohwo', 'isaac@ewarri.com',
     '$2b$08$DPJMyv4DkeuMjYys0/91m.3eyA6HPPSFk/K6gpq6Vd4zBS3XrKu3.', 
     '+2347030062542', 'https://avatars1.githubusercontent.com/u/41282717?s=40&v=4', 'true')`;
    pool.query(queryText)
    .then((res) =>{
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })
}

const createPartyTable = () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS
        parties(
            id serial PRIMARY KEY,
            name TEXT UNIQUE NOT NULL,
            hqaddress TEXT NOT NULL,
            logourl TEXT NOT NULL,
            createddate TIMESTAMP,
            modifieddate TIMESTAMP
        );
    CREATE TABLE IF NOT EXISTS 
        offices(
        id serial PRIMARY KEY,
        type VARCHAR(128) NOT NULL,
        name VARCHAR(128) UNIQUE NOT NULL
    );
    CREATE TABLE IF NOT EXISTS
      users(
        id serial PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        othernames VARCHAR(50) NOT NULL,
        password VARCHAR(128) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        phonenumber VARCHAR(128) NOT NULL UNIQUE,
        passporturl VARCHAR(128) NOT NULL UNIQUE,
        isAdmin boolean NOT NULL DEFAULT false
      );
      CREATE TABLE IF NOT EXISTS 
        candidates(
            id serial PRIMARY KEY,
            office INT NOT NULL REFERENCES offices(id) ON DELETE RESTRICT,
            party INT NOT NULL  REFERENCES parties(id) ON DELETE RESTRICT,
            candidate INT NOT NULL UNIQUE  REFERENCES users(id) ON DELETE CASCADE,
            status status NOT NULL DEFAULT pending
        );

        CREATE TABLE IF NOT EXISTS 
        votes(
            id serial PRIMARY KEY,
            createdOn TIMESTAMP NOT NULL,
            createdBy INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
            office INT NOT NULL REFERENCES offices(id) ON DELETE RESTRICT,
            candidate INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
        );

        
        
        `;

        pool.query(queryText)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
};

createPartyTable();
createAdminUser();
createType();