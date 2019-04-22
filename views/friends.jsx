var React = require("react");
var DefaultLayout = require("./default");
var Navbar = require("./navbar")

class Friends extends React.Component {
  render() {

    return (
    <DefaultLayout>
        <Navbar/>
            <div className="concert-body" style={{"margin-top": 250 + "px"}}>
                <h2>Find friends</h2><br/>
                <form method="POST" action="/friends/results">
                    <input type="text" name="search" placeholder="Search by username"/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
    </DefaultLayout>
    );
  }
}

module.exports = Friends;
