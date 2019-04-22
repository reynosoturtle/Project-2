var React = require('react');

class Navbar extends React.Component {
  render() {
                   /*<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>


            <li><a href={`profile/${id}`}><h3>My profile</h3></a></li>
            <li><a href="/search"><h3>Find friends</h3></a></li>
            <li><a href={`tickets/${id}`}><h3> My tickets</h3></a></li>
            <li><a href="/"><h3>Logout</h3></a></li>*/
    return (
    <navbar>
        <a href="/home">
            <div id="logo">
                <img src="/img/logo.png" width="100"/>
            </div>
        </a>
        <ul className="nav-list">
            <a href="/friends"><li><span>Find friends</span></li></a>
            <a href={`tickets/id`}><li><span> My tickets</span></li></a>
            <a href="/"><li><span>Logout</span></li></a>
        </ul>
    </navbar>
    );
  }
}

module.exports = Navbar;
