var React = require("react");
var DefaultLayout = require("./default");
var Navbar = require("./navbar")

class Invites extends React.Component {
  render() {

    let invitesList = this.props.invites.map( (invite) => {
                return (
                    <li style={{"margin-top": 50 + "px"}}>
                        <a href={`/concert/purchase/${invite.id}`}>
                            <div className="image-frame-container">
                                <div className="image-frame clip">
                                    <img className="image-in-frame clip" src={invite.picture}/>
                                </div>
                            </div>
                            <h1 style={{"max-width": 300 + "px"}}>{invite.artist}</h1>
                        </a>
                    </li>
                )
    })

    return (
      <DefaultLayout>
        <Navbar/>
        <div className="page-header">
            <h1>ur invites</h1>
        </div>
        <ul style={{"margin-top": 200 + "px", "list-style": "none"}}>
            {invitesList}
        </ul>
      </DefaultLayout>
    );
  }
}

module.exports = Invites;
