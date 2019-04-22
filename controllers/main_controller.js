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
        search: request.body.search,
        userCookie: request.cookies.username
    }

    const doneWithQuery = (data) => {
        const friends = {dataSet: data}
        response.render('friendsResult', friends);
    };

    db.TicketApp.searchFriendResult(data, doneWithQuery);
  };

  let friendAddedResultControllerCallback = (request, response) => {
    let data = {
        myId: request.body.myId,
        friendId: request.body.friendId
    }

    const doneWithQuery = (data) => {
        response.send(data);
    }

    db.TicketApp.friendAdded(data, doneWithQuery);
  }

  let inviteFriendsControllerCallback = (request, response) => {
    let data = {
        concertId: request.params.id,
        userCookie: request.cookies.username
    }

    const doneWithQuery = (data) => {
        const friends = {dataSet: data}
        console.log(friends)
        response.render('invite', friends);
    };

    db.TicketApp.purchaseListOfFriends(data, doneWithQuery);
  }

  let paymentControllerCallback = (request, response) => {
    let data = {
        userCookie: request.cookies.username,
        concertId: request.params.id,
        friendId: request.body.invitedFriend
    }

    const doneWithQuery = (data) => {
        const concert = {concert: data}
        response.render('purchase', concert);
    };

    db.TicketApp.purchasePayment(data, doneWithQuery);
  }

  let purchasedControllerCallback = (request, response) => {
    let data = {
        userCookie: request.cookies.username,
        concertId: request.body.concertId
    }

    const doneWithQuery = (data) => {
        const ticket = {purchasedTicket: data}
        response.redirect("/home");
    };

    db.TicketApp.purchaseTicket(data, doneWithQuery);
  }

  let viewTicketsControllerCallback = (request, response) => {
    let data = {
        userCookie: request.cookies.username
    }

    const doneWithQuery = data => {
        const ticketList = {tickets: data};
        response.render('tickets', data);
    }

    db.TicketApp.viewTickets(data, doneWithQuery);
  }

  let viewInvitesControllerCallback = (request, response) => {
    let data = {
        userCookie: request.cookies.username
    }

    const doneWithQuery = data => {
        const inviteList = {invites: data};
        response.render('invites', data);
    }

    db.TicketApp.viewInvites(data, doneWithQuery);
  }


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
    friendAdded: friendAddedResultControllerCallback,
    inviteFriends: inviteFriendsControllerCallback,
    payment: paymentControllerCallback,
    purchase: purchasedControllerCallback,
    viewTickets: viewTicketsControllerCallback,
    viewInvites:  viewInvitesControllerCallback,
  };
};
