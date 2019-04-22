var React = require("react");
var DefaultLayout = require("./default");
var Navbar = require("./navbar")

class friendsResult extends React.Component {
  render() {
    let searchResult = this.props.friends.map ( (friend) => {
        return (
            <li>
                <h3>{friend.username}</h3>
                <a className="addFriendButton" friendId={friend.id} href={`add/${friend.id}`}>Befriend this loser</a>
            </li>
        );
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
