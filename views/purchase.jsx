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
        // let searchResult = this.props.dataSet.friends.map ( (friend) => {
        //     return (
        //         <div>
        //             <input style={{"width": 30+"px"}} type="checkbox" name={friend.id} value={friend.username} id={friend.username}/>
        //             <label for={friend.username}>{friend.username}</label>
        //         </div>
        //     )
        // })
    return (
      <DefaultLayout>
        <Navbar/>
          <div className="concert-body" style={{"margin-top": 250 + "px"}}>

                <h2>Purchase ticket(s) for </h2><br/>
                <form method="POST" action="/concert/purchase/complete">
                    <input type="hidden" name="concertId" value={this.props.concert.concert[0].id}/>
                    <input type="text" name="cardName" placeholder="Cardholder Name"/>
                    <input type="text" name="cardNumber" placeholder="Card Number"/>
                    <input type="text" name="expiration" placeholder="Expiration: DD/MM"/>
                    <input type="text" name="cvv" placeholder="CVV"/>
                    <input type="submit" value="Submit"/>
                </form>
          </div>
      </DefaultLayout>
    );
  }
}

module.exports = Purchase;
