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
    user_id INTEGER,
    barcode TEXT,
    status TEXT
);

CREATE TABLE IF NOT EXISTS friends (
    users_id INTEGER,
    friends_id INTEGER
);