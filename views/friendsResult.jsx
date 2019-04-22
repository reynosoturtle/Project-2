var React = require("react");
var DefaultLayout = require("./default");
var Navbar = require("./navbar")

class friendsResult extends React.Component {
  render() {
    console.log(this.props.dataSet);
    let searchResult = this.props.dataSet.search.map ( (search) => {
        if (this.props.dataSet.friends[0].length > 0) {
            //alr friends
            return (
                <li>
                    <h3>{search.username}</h3>
                    <span id="associate" myId={this.props.dataSet.self[0].id} friendId={search.id}>you alr friends w this lüser</span>
                </li>
            );
        } else {
            return (
                <li>
                    <h3>{search.username}</h3>
                    <span id="associate" myId={this.props.dataSet.self[0].id} friendId={search.id} style={{"cursor": "pointer"}}>Befriend this lüser</span>
                </li>
            );
        }
    })


    return (
    <DefaultLayout>
        <Navbar/>
        <div className="concert-body" style={{"margin-top": 250 + "px"}}>
            <h2>Find friends</h2><br/>
            <form method="POST" action="/friends/results">
                <input type="text" name="search" placeholder="Search by username"/>
                <input type="submit" value="Submit"/>
            </form>
            <ul>
                {searchResult}
            </ul>
        </div>
    </DefaultLayout>
    );
  }
}

module.exports = friendsResult;
