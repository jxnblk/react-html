
var React = require('react');

var Html = React.createClass({

  getDefaultProps: function() {
    return {
      title: '',
      description: '',
      author: '',
      favicon: false,
      javascripts: [],
      stylesheets: [],
    }
  },

  renderScript: function(script, i) {
    return (<script src={script} key={'script-' + i} />);
  },

  render: function() {
    var ownerProps = this._owner ? this._owner.props : {};
    var init = {
      __html: "window.INITIAL_PROPS = " + JSON.stringify(ownerProps) + ";\n"
    };
    var javascripts = [];
    if (this.props.script) {
      javascripts = [this.props.script];
    } else if (this.props.javascripts) {
      javascripts = this.props.javascripts;
    }
    return (
      <html>
        <Html.Head {...this.props} />
        <body>
          {this.props.children}
          <script dangerouslySetInnerHTML={init} />
          {javascripts.map(this.renderScript)}
        </body>
      </html>
    )
  }

});

Html.Head = React.createClass({

  getDefaultProps: function() {
    return {
      title: '',
      description: '',
      author: '',
      favicon: false,
      stylesheets: [],
    }
  },

  renderStylesheet: function(stylesheet, i) {
    return (
      <link rel="stylesheet" href={stylesheet} key={'stylesheet-' + i} />
    )
  },

  renderFavicon: function() {
    if (!this.props.favicon) return false;
    return <link rel="icon" href={this.props.favicon} />
  },

  render: function() {
    var stylesheets = [];
    if (this.props.stylesheet) {
      stylesheets = [this.props.stylesheet];
    } else if (this.props.stylesheets) {
      stylesheets = this.props.stylesheets;
    }
    return (
      <head>
        <meta charSet="utf-8" />
        <title>{this.props.title}</title>
        <meta name="description" content={this.props.description} />
        <meta name="author" content={this.props.author} />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        {this.renderFavicon()}
        {stylesheets.map(this.renderStylesheet)}
      </head>
    )
  }

});



module.exports = Html;

