var React = require("react");
var DefaultLayout = require("./default");
var Navbar = require("./navbar")

class Concert extends React.Component {
  render() {
                            /*<iframe src={concert.preview} width="400" height="230" frameborder="0" allowtransparency="true" allow="encrypted-media">
                            </iframe>*/
    let concert = this.props.oneConcert.map ( (concert) => {
        return (
            <div className="concert-container">
                <div className="concert-head">
                    <div className="image-frame-container">
                        <div className="image-frame clip">
                            <img className="image-in-frame clip" src={concert.picture}/>
                        </div>
                    </div>
                    <div className="iframe-frame-container">
                        <iframe className="shadow clip2" src={concert.preview} width="600" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                    </div>
                </div>
                <div className="concert-body">
                    <h1>{concert.artist}</h1>
                    <h3 style={{"margin-top": -10 + "px"}}>{concert.day} {concert.month} {concert.year}, {concert.time}<br/>at {concert.venue}</h3>
                    <h3>${concert.ticket_price}, {concert.tickets_unsold} tickets available</h3>
                    <div className="line"></div>
                    <h2>About</h2>
                    <h3>{concert.details}</h3>
                    <a href={`purchase/${concert.id}`} style={{"text-decoration": "underline"}}><h3>Purchase ticket(s)</h3></a>
                </div>
            </div>
        );
    });

    return (
      <DefaultLayout>
        <Navbar/>
            {concert}
      </DefaultLayout>
    );
  }
}

module.exports = Concert;
