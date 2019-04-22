var React = require("react");
var DefaultLayout = require("./default");

class Login extends React.Component {
  render() {

    return (
      <DefaultLayout>
      <div className="concert-body" style={{"margin-top": 250 + "px"}}>
            <h2>Log in to your account</h2><br/>
            <form method="POST" action="/login/complete">
                <input type="text" name="username" placeholder="Username"/>
                <input type="password" name="password" placeholder="Password"/>
                <input type="submit" value="Submit"/>
            </form>
      </div>
      </DefaultLayout>
    );
  }
}

module.exports = Login;
