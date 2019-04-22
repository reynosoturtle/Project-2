var React = require("react");
var DefaultLayout = require("./default");
var Navbar = require("./navbar")

class Purchase extends React.Component {
  render() {
                            /*
                            THIS PAGE NEEDS:
                            Invite friend(s)
                            Credit card details
                            */
    return (
      <DefaultLayout>
        <Navbar/>
          <div className="concert-body" style={{"margin-top": 250 + "px"}}>
                <h2>Purchase ticket(s) for </h2><br/>
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

module.exports = Purchase;
