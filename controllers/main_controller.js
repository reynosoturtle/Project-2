module.exports = db => {

  const sha256 = require("js-sha256");
  const SALT = "shibe";

  let landingControllerCallback = (request, response) => {
    response.render("landing");
  };

  let registerControllerCallback = (request, response) => {
    response.render("register");
  };

  let registerCompleteControllerCallback = (request, response) => {
    let data = {
        username: request.body.username,
        password: request.body.password
    }

    const doneWithQuery = (data) => {
        console.log("inside doneWithQuery, data is: ");
        console.log(data);
        if (data.check == "failed") {
            response.render("register");
        } else {
            let hash = sha256(SALT + request.body.username);
            response.cookie('username', request.body.username);
            response.cookie('loggedIn', hash);
            response.redirect("/home");
        }
    };

    db.TicketApp.registerComplete(data, doneWithQuery);
  };

  let loginControllerCallback = (request, response) => {
    response.render("login");
  };

  let loginCompleteControllerCallback = (request, response) => {
    let data = {
        username: request.body.username,
        password: request.body.password
    }

    const doneWithQuery = (data) => {
        let hash = sha256(SALT + request.body.username);
        response.cookie('username', request.body.username);
        response.cookie('loggedIn', hash);
        response.redirect('/home');
    };

    db.TicketApp.loginComplete(data, doneWithQuery);
  };

  let indexControllerCallback = (request, response) => {
    let data = {};

    db.TicketApp.getAllConcerts((error, allConcerts) => {
      data["allConcerts"] = allConcerts;
      response.render("index", data);
    });
  };

  let concertDetailsControllerCallback = (request, response) => {

    let data = {
        id : request.params.id
    };

    let doneWithQuery = (data) => {
        const concert = { oneConcert: data};
        response.render("concert", concert);

    }

    db.TicketApp.getOneConcert(data, doneWithQuery);
  };

  let findFriendsControllerCallback = (request, response) => {
    response.render("friends");
  };

  let friendSearchResultControllerCallback = (request, response) => {
    let data = {
        username: request.body.search,
    }

    const doneWithQuery = (data) => {
        const friends = { friends: data}
        response.render('friendsResult', friends);
    };

    db.TicketApp.searchFriendResult(data, doneWithQuery);
  };
  return {
    landing: landingControllerCallback,
    index: indexControllerCallback,
    concertDetails: concertDetailsControllerCallback,
    register: registerControllerCallback,
    registerComplete: registerCompleteControllerCallback,
    login: loginControllerCallback,
    loginComplete: loginCompleteControllerCallback,
    addFriends: findFriendsControllerCallback,
    friendSearchResult: friendSearchResultControllerCallback,
  };
};
