module.exports = (dbPoolInstance) => {

  const sha256 = require("js-sha256");
  const SALT = "shibe";

    let getAllConcerts = (callback) => {
        let query = "SELECT * FROM concerts";

        dbPoolInstance.query(query, (error, queryResult) => {
            if ( error ){
                callback(error, null);

            } else {
                if ( queryResult.rows.length > 0 ){
                callback(null, queryResult.rows);
                } else {
                    callback(null, null);
                }
            }
        });
    };

    let getOneConcert = (data, doneWithQuery) => {
        let query = "SELECT * FROM concerts WHERE id='" + data.id +"'";

        dbPoolInstance.query(query, (error, queryResult) => {
            if ( error ){
                doneWithQuery(error, null);
            } else {
                doneWithQuery(queryResult.rows);
            }
        });
    };

    let registerComplete = (data, doneWithQuery) => {
        console.log("data passed to model:")
        console.log(data)
        let existingCheck = 'SELECT username FROM users WHERE username = ($1)';
        let checkValue = [data.username];

        dbPoolInstance.query(existingCheck, checkValue, (error, result) => {
            // console.log("passing data to check")
            if (error) {
                console.log(error, null);
            } else if (result.rows.length > 0) {
                // console.log("check failed")
                // console.log("Username already taken!");
                const userExists = {"check": "failed"};
                doneWithQuery(userExists);
            } else  if (result.rows.length == 0) {
                console.log("check pass")
                let query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
                let hash = sha256(data.password + SALT);
                let values = [data.username, hash];
                dbPoolInstance.query(query, values, (error, result) => {
                    if ( error ) {
                        console.log(error, null);
                    } else {
                        const newUser = {"check": "pass"};
                        doneWithQuery(newUser);
                    }
                });
            }
        })
    };

    let loginComplete = (data, doneWithQuery) => {
        let hash = sha256(data.password + SALT);
        let query = "SELECT * FROM users WHERE username='" + data.username +"'";

        dbPoolInstance.query(query, (error, result) => {
            if ( error ) {
                console.log(error, null);
            } else {
                if (result.rows.length > 0) {
                    console.log(result.rows[0])
                    console.log(hash)
                    if (result.rows[0].password == hash) {
                        //login successful
                        let userLogin = sha256(data.username + SALT);
                        // invoke callback function with results after query has executed
                        doneWithQuery(userLogin);
                    } else {
                        //wrong password entered
                        console.log(error, null);
                    }
                } else {
                  //wrong username entered
                  console.log(error, null);
                }
            }
        });
    };

    let searchFriendResult = (data, doneWithQuery) => {
        let searchResults = "SELECT * FROM users WHERE username='" + data.search +"'";

        dbPoolInstance.query(searchResults, (error, searchQueryResult) => {
            if ( error ){
                console.log("IS THE ERROR HERE????")
                doneWithQuery(error, null);
            } else {
                // let search = { search: searchQueryResult.rows };
                // console.log(search)
                let friendsStatus = "SELECT friends.users_id, friends.friends_id, users.username " +
                                    "FROM users INNER JOIN friends " +
                                    "ON (friends.users_id = users.id) " +
                                    "WHERE username='" + data.userCookie +"'";

                dbPoolInstance.query(friendsStatus, (error, friendsStatusQueryResult) => {
                    if (error) {
                        console.log("OR HEREEE??!?!?!?")
                        doneWithQuery(error, null);
                    } else {
                        let selfData = "SELECT * FROM users WHERE username='" + data.userCookie +"'";
                        dbPoolInstance.query(selfData, (error, selfDataQueryResult) => {
                            let something = { friends: friendsStatusQueryResult.rows, search: searchQueryResult.rows, self: selfDataQueryResult.rows }
                            doneWithQuery(something);
                        })
                    }
                })
            }
        });
    };

    let friendAdded = (data, doneWithQuery) => {
        console.log(data)
        let query = "INSERT INTO friends (users_id, friends_id) VALUES ($1, $2)";
        let values = [data.myId, data.friendId];

        dbPoolInstance.query(query, values, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                let secondQuery = "INSERT INTO friends (users_id, friends_id) VALUES ($1, $2)";
                let secondValues = [data.friendId, data.myId];
                dbPoolInstance.query(secondQuery, secondValues, (error, result) => {
                    if (error) {
                        console.log(error);
                    } else {
                        doneWithQuery({friendAdded: true});
                    }
                });
            }
        })
    }

    let purchaseListOfFriends = (data, doneWithQuery) => {
        let selfData = "SELECT * FROM users WHERE username='" + data.userCookie +"'";
        dbPoolInstance.query(selfData, (error, selfDataQueryResult) => {
            let myId = selfDataQueryResult.rows[0].id;
            if (error) {
                console.log(error);
            } else {
                let friendsList =   "SELECT users.id, users.username " +
                                    "FROM users INNER JOIN friends " +
                                    "ON (friends.users_id = users.id) " +
                                    "WHERE friends.friends_id = '" + myId +"'";
                dbPoolInstance.query(friendsList, (error, friendsListQueryResult) => {
                    if (error) {
                        console.log(error);
                    } else {
                        let concertDetails = "SELECT * FROM concerts WHERE id='" + data.concertId + "'";
                        dbPoolInstance.query(concertDetails, (error, concertDetailsQueryResult) => {
                            if (error) {
                                console.log(error);
                            } else {
                                let something = {concert: concertDetailsQueryResult.rows, friends: friendsListQueryResult.rows, self: selfDataQueryResult.rows};
                                doneWithQuery(something);
                            }
                        })
                    }
                })
            }
        })
    };

    let purchasePayment = (data, doneWithQuery) => {
        let selfData = "SELECT * FROM users WHERE username='" + data.userCookie +"'";
        dbPoolInstance.query(selfData, (error, selfDataQueryResult) => {
            let myId = selfDataQueryResult.rows[0].id;
            if (error) {
                console.log("LANJIAO")
                console.log(error);
            } else {
                let invited = "INSERT INTO invites (users_id, friends_id, concert_id) VALUES ($1, $2, $3)";
                let values = [myId, data.friendId, data.concertId];
                dbPoolInstance.query(invited, values, (error, invitedQueryResult) => {
                    if (error) {
                        console.log("PLEASE LA");
                        console.log(error);
                    } else {
                        let concertDetails = "SELECT * FROM concerts WHERE id='" + data.concertId + "'";
                        dbPoolInstance.query(concertDetails, (error, concertDetailsQueryResult) => {
                            let something = {concert: concertDetailsQueryResult.rows}
                            doneWithQuery(something);
                        })
                    }
                })
            }
        })
    }

    let purchaseTicket = (data, doneWithQuery) => {
        let selfData = "SELECT * FROM users WHERE username='" + data.userCookie +"'";
        dbPoolInstance.query(selfData, (error, selfDataQueryResult) => {
            let myId = selfDataQueryResult.rows[0].id;
            if (error) {
                console.log("LANJIAO")
                console.log(error);
            } else {
                let ticketBought = "INSERT INTO tickets (concert_id, users_id) VALUES ($1, $2)";
                let values = [data.concertId, myId];
                dbPoolInstance.query(ticketBought, values, (error, queryResult) => {
                    if (error) {
                        console.log("CHAOCHEEBAI")
                        console.log(error);
                    } else {
                        doneWithQuery({purchase: true});
                    }
                })
            }
        })
    };

    let viewTickets = (data, doneWithQuery) => {
        let selfData = "SELECT * FROM users WHERE username='" + data.userCookie +"'";
        dbPoolInstance.query(selfData, (error, selfDataQueryResult) => {
            let myId = selfDataQueryResult.rows[0].id;
            if (error) {
                console.log("LANJIAO")
                console.log(error);
            } else {
                let listOfTickets = "SELECT concerts.artist, concerts.picture " +
                                    "FROM tickets " +
                                    "INNER JOIN concerts ON (concerts.id = tickets.concert_id) " +
                                    "INNER JOIN users ON (users.id = tickets.users_id) " +
                                    "WHERE users.id = '" +myId+ "'";
                dbPoolInstance.query(listOfTickets, (error, listOfTicketsQueryResult) => {
                    if (error) {
                        console.log("??!?!!?!")
                        console.log(error)
                    } else {
                        let something = {tickets: listOfTicketsQueryResult.rows};
                        doneWithQuery(something);
                    }
                })
            }
        });
    }

    let viewInvites = (data, doneWithQuery) => {
        let selfData = "SELECT * FROM users WHERE username='" + data.userCookie +"'";
        dbPoolInstance.query(selfData, (error, selfDataQueryResult) => {
            let myId = selfDataQueryResult.rows[0].id;
            if (error) {
                console.log("LANJIAO")
                console.log(error);
            } else {
                let listOfInvites = "SELECT concerts.artist, concerts.picture, concerts.id " +
                                    "FROM invites " +
                                    "INNER JOIN concerts ON (concerts.id = invites.concert_id) " +
                                    "INNER JOIN users ON (users.id = invites.friends_id) " +
                                    "WHERE users.id = '" +myId+ "'";
                dbPoolInstance.query(listOfInvites, (error, listOfInvitesQueryResult) => {
                    if (error) {
                        console.log("??!?!!?!")
                        console.log(error)
                    } else {
                        let something = {invites: listOfInvitesQueryResult.rows};
                        doneWithQuery(something);
                    }
                })
            }
        });
    }

  return {
    getAllConcerts,
    getOneConcert,
    registerComplete,
    loginComplete,
    searchFriendResult,
    friendAdded,
    purchaseListOfFriends,
    purchasePayment,
    purchaseTicket,
    viewTickets,
    viewInvites,
  };
};
