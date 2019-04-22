var React = require("react");
var DefaultLayout = require("./default");
var Navbar = require("./navbar")

class Home extends React.Component {
  render() {

    /*
    let allConcerts = this.props.allConcerts.map ( (concert) => {
        return (
            <li>
                <ul>
                    <div className="card border-primary">
                        <div className="card-header text-center">
                            <img src={concert.picture} style={{width: 400 + "px"}}/>
                        </div>
                        <div className="card-body text-primary">
                            <h5 className="card-title">{concert.artist}</h5>
                            <p className="card-text">{concert.details}</p>
                        </div>
                        <div className="card-footer text-center">
                            <a class="btn" href={`/concert/${concert.id}`}><h3>Find out more</h3></a>
                        </div>
                    </div>
                </div>
            </li>
        );
    });
    */

    const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const arr = this.props.allConcerts;

    let sortConcerts = alphabets.map( (alphabet) => {
        let temp = [];
        arr.forEach( (item) => {
            if (item.artist.charAt(0).toLowerCase() == alphabet) {
                temp.push(item);
            }
        })

        if (temp.length > 0) {
            let sorted = temp.map( (concert) => {
                return (
                    <li style={{"margin-top": 50 + "px"}}>
                        <a href={`concert/${concert.id}`}>
                            <div className="image-frame-container">
                                <div className="image-frame clip">
                                    <img className="image-in-frame clip" src={concert.picture}/>
                                </div>
                            </div>
                            <h1 style={{"max-width": 300 + "px"}}>{concert.artist}</h1>
                        </a>
                    </li>
                )
            })
            return (
                <div className="concert-body" style={{"margin-top": 50 + "px"}}>
                    <h1>{alphabet}</h1>
                    <div className="line"></div>
                    <ul>
                        {sorted}
                    </ul>
                </div>
            )
        }
    })

    return (
      <DefaultLayout>
        <Navbar/>
        <div className="page-header">
            <h1>Concerts near you</h1>
        </div>
        <div style={{"margin-top": 200 + "px"}}>
            {sortConcerts}
        </div>
      </DefaultLayout>
    );
  }
}

module.exports = Home;
