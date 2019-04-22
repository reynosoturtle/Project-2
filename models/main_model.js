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
        let query = "SELECT * FROM users WHERE username='" + data.username +"'";

        dbPoolInstance.query(query, (error, queryResult) => {
            if ( error ){
                doneWithQuery(error, null);
            } else {
                doneWithQuery(queryResult.rows);
            }
        });
    };

  return {
    getAllConcerts,
    getOneConcert,
    registerComplete,
    loginComplete,
    searchFriendResult,
  };
};
