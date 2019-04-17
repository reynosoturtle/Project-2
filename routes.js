module.exports = (app, allModels) => {

  const APPNAMEControllerCallbacks = require("./controllers/main_controller")(allModels);
  app.get("/", APPNAMEControllerCallbacks.index);
};
