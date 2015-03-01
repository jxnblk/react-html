
var React = require('react');

var Head = React.createClass({
  render: function() {
    return (
      <head>
        <meta charSet="utf-8" />
        <title>{this.props.title}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link rel="stylesheet" href={this.props.stylesheet} />
      </head>
    )
  }
});

module.exports = React.createClass({

  renderScript: function() {
    if (!this.props.script) { return false; }
    return (<script src={this.props.script} />);
  },

  render: function() {
    var init = {
      __html: "window.INITIAL_PROPS = " + JSON.stringify(this._owner.props) + ";\n"
    };
    return (
      <html>
        <Head {...this.props} />
        <body>
          {this.props.children}
          <script dangerouslySetInnerHTML={init} />
          {this.renderScript}
        </body>
      </html>
    )
  }

});

