module.exports = db => {

  const hash = require("js-sha256");
  const SALT = "pepper";

  let APPNAMEControllerCallback = (request, response) => {
    let data = {};
    data["userId"] = request.cookies.userId;

    db.APPNAME.getAll((error, allTweets) => {
      data["allTweets"] = allTweets;
      response.render("APPNAME/index", data);

    });
  };

  return {
    APPNAME: APPNAMEControllerCallback,
  };
};
