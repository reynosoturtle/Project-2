var React = require("react");
var DefaultLayout = require("./default");
var Navbar = require("./navbar")

class Tickets extends React.Component {
  render() {

    let ticketsList = this.props.tickets.map( (ticket) => {
                return (
                    <li style={{"margin-top": 50 + "px"}}>
                        <a href={`concert/${ticket.id}`}>
                            <div className="image-frame-container">
                                <div className="image-frame clip">
                                    <img className="image-in-frame clip" src={ticket.picture}/>
                                </div>
                            </div>
                            <h1 style={{"max-width": 300 + "px"}}>{ticket.artist}</h1>
                        </a>
                    </li>
                )
    })

    return (
      <DefaultLayout>
        <Navbar/>
        <div className="page-header">
            <h1>ur tix</h1>
        </div>
        <ul style={{"margin-top": 200 + "px", "list-style": "none"}}>
            {ticketsList}
        </ul>
      </DefaultLayout>
    );
  }
}

module.exports = Tickets;
