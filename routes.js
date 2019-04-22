module.exports = (app, allModels) => {

  const TicketAppControllerCallbacks = require("./controllers/main_controller")(allModels);
  app.get("/", TicketAppControllerCallbacks.landing);
  app.get("/register", TicketAppControllerCallbacks.register);
  app.post("/register/complete", TicketAppControllerCallbacks.registerComplete);
  app.get("/login", TicketAppControllerCallbacks.login);
  app.post("/login/complete", TicketAppControllerCallbacks.loginComplete);
  app.get("/home", TicketAppControllerCallbacks.index);
  app.get("/concert/:id", TicketAppControllerCallbacks.concertDetails);
  app.get("/friends", TicketAppControllerCallbacks.addFriends);
  app.post("/friends/results", TicketAppControllerCallbacks.friendSearchResult);
  app.post("/friends/added", TicketAppControllerCallbacks.friendAdded);
  app.get("/concert/purchase/:id", TicketAppControllerCallbacks.inviteFriends);
  app.post("/concert/purchase/:id/payment", TicketAppControllerCallbacks.payment);
  app.post("/concert/purchase/complete", TicketAppControllerCallbacks.purchase);
  app.get("/tickets", TicketAppControllerCallbacks.viewTickets);
  app.get("/invites", TicketAppControllerCallbacks.viewInvites);
};
