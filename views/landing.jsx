var React = require("react");
var DefaultLayout = require("./default");

class Landing extends React.Component {
  render() {

    return (
      <DefaultLayout>
      <div className="landing-body">
        <div className="landing-logo">
            <img src="/img/logo.png" width="150"/>
        </div>
            <h2 style={{"text-transform": "none", "color": "#2b78bd"}}>For all your concert needs.</h2><br/><br/>
            <h3 style={{"text-transform": "none"}}>You will need to be logged in to proceed.</h3><br/>
            <a className="register-button" href="register"><h3>Register</h3></a>
            <a className="login-button" href="login"><h3>Log In</h3></a>
      </div>
      </DefaultLayout>
    );
  }
}

module.exports = Landing;
