DROP DATABASE IF EXISTS politica;
CREATE DATABASE politica;

\c politica;

CREATE TABLE IF NOT EXISTS users(
    id UUID PRIMARY KEY,
    firstname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    othername VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    phoneNumber VARCHAR(128) UNIQUE NOT NULL,
    passportUrl VARCHAR(255) UNIQUE NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS parties(
    id UUID PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    hqAddress TEXT NOT NULL,
    logoUrl TEXT NOT NULL,
    createdDate TIMESTAMP,
    modifiedDate TIMESTAMP
);

CREATE TABLE IF NOT EXISTS offices(
    id UUID PRIMARY KEY,
    type VARCHAR(128) NOT NULL,
    name VARCHAR(128) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS votes(
    id UUID PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL,
    createdBy UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    office UUID NOT NULL REFERENCES offices(id) ON DELETE RESTRICT,
    candidate UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS candidates(
    id UUID PRIMARY KEY,
    office UUID NOT NULL REFERENCES offices(id) ON DELETE RESTRICT,
    party UUID NOT NULL REFERENCES parties(id) ON DELETE RESTRICT,
    candidate UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);


INSERT INTO 
users(id,firstname, lastname, othername, email, password, phoneNumber, passportUrl, isAdmin)
VALUES('Isaac', 'Warri', 'Emuohwo', 'isaac@ewarri.com', '$2b$08$DPJMyv4DkeuMjYys0/91m.3eyA6HPPSFk/K6gpq6Vd4zBS3XrKu3.', '+2347030062542', 'https://avatars1.githubusercontent.com/u/41282717?s=40&v=4', 'true');