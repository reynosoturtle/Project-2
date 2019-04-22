/* MVP TABLES */

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT
);

CREATE TABLE IF NOT EXISTS concerts (
    id SERIAL PRIMARY KEY,
    artist TEXT,
    day INTEGER,
    month TEXT,
    year INTEGER,
    time VARCHAR,
    details TEXT,
    ticket_price INTEGER,
    venue TEXT,
    preview TEXT,
    tickets_unsold INTEGER,
    picture TEXT
);

CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    concert_id INTEGER,
    users_id INTEGER
);

CREATE TABLE IF NOT EXISTS friends (
    users_id INTEGER,
    friends_id INTEGER
);

CREATE TABLE IF NOT EXISTS invites (
    id SERIAL PRIMARY KEY,
    users_id INTEGER,
    friends_id INTEGER,
    concert_id INTEGER
);