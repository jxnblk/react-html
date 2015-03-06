
var React = require('react');

var Head = React.createClass({

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
        <meta name="authot" content={this.props.author} />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        {this.renderFavicon()}
        {stylesheets.map(this.renderStylesheet)}
      </head>
    )
  }

});


module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      title: '',
      description: '',
      author: '',
      favicon: false,
      scripts: [],
      stylesheets: [],
    }
  },

  renderScript: function(script, i) {
    return (<script src={script} key={'script-' + i} />);
  },

  render: function() {
    var init = {
      __html: "window.INITIAL_PROPS = " + JSON.stringify(this._owner.props) + ";\n"
    };
    var scripts = [];
    if (this.props.script) {
      scripts = [this.props.script];
    } else if (this.props.scripts) {
      scripts = this.props.scripts;
    }
    return (
      <html>
        <Head {...this.props} />
        <body>
          {this.props.children}
          <script dangerouslySetInnerHTML={init} />
          {scripts.map(this.renderScript)}
        </body>
      </html>
    )
  }

});

