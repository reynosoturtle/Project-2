var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'/>
                    <link rel="stylesheet" href="/css/fonts.css"/>
                    <link rel="stylesheet" href="/css/style.css"/>
                </head>

                <body>
                    {this.props.children}
                    <script src="/js/script.js"></script>
                </body>

            </html>
    );
  }
}

module.exports = DefaultLayout;
