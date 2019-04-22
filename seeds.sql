/* MVP SEEDS */

/* users */
-- INSERT INTO users (username, password) VALUES ('John Doe', 'password');
-- INSERT INTO users (username, password) VALUES ('Chrostoan Reynisi', 'password');

/* concerts */
INSERT INTO concerts (artist, ticket_price, day, month, year, time, details, venue, preview, tickets_unsold, picture) VALUES ('Arctic Monkeys', '200', '14', 'May', '2019','1900hrs', 'Tranquility Base Hotel & Casino Tour is the sixth headlining concert tour by English indie rock band Arctic Monkeys in support of their sixth studio album, Tranquility Base Hotel & Casino. The tour began on 2 May 2018 in San Diego, United States at The Observatory North Park and is scheduled to conclude on 7 April 2019 in Bogotá, Colombia at Estéreo Picnic Festival. This marks their first tour since AM Tour (2013–2014).', 'The Observatory North Park', 'https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1E4mIHTTgln8R5', '1000', 'https://is5-ssl.mzstatic.com/image/thumb/Music62/v4/bb/5e/43/bb5e4320-31a1-6089-967a-3afa0eb27545/source/1200x1200bb.jpg');
INSERT INTO concerts (artist, ticket_price, day, month, year, time, details, venue, preview, tickets_unsold, picture) VALUES ('Oh Wonder', '175', '14', 'May', '2019', '1900hrs', 'Oh Wonder are a London-based alt-pop duo, consisting of Anthony West and Josephine Vander Gucht. Since releasing their debut album, they have seen international success with their alt-pop singles. Vander Gucht and West recorded and released one song a month for a year, starting in September 2014. All of the songs were released together as a self-titled debut album on 4 September 2015. On 14 July 2017, the duo released their second album, Ultralife.', 'London Bridge', 'https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1E4mIHTTgln8R5', '1000', 'https://is5-ssl.mzstatic.com/image/thumb/Music111/v4/e9/4e/39/e94e393b-cb42-dd22-fd3c-03318d6425bc/source/1200x1200bb.jpg');


/* tickets */
INSERT INTO tickets (concert_id, user_id, barcode, status) VALUES ('1', '1', 'Fake ass barcode', 'confirmed');
INSERT INTO tickets (concert_id, user_id, barcode, status) VALUES ('1', '2', 'Fake ass barcode', 'pending');
