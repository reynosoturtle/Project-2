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
        // console.log(this.props.dataSet)
        let concertId = this.props.dataSet.concert[0].id;
        let friendsList = this.props.dataSet.friends.map ( (friend) => {
            return (
                <div>
                    <input style={{"width": 30+"px"}} type="radio" name="invitedFriend" value={friend.id} id={friend.id}/>
                    <label for={friend.username}>{friend.username}</label>
                </div>
            )
        })
    return (
      <DefaultLayout>
        <Navbar/>
          <div className="concert-body" style={{"margin-top": 250 + "px"}}>

                <h2>Purchase ticket(s) for </h2><br/>
                <form method="POST" action={`/concert/purchase/${concertId}/payment`}>
                    {friendsList}
                    <input type="submit" value="Submit"/>
                </form>
          </div>
      </DefaultLayout>
    );
  }
}

module.exports = Purchase;
