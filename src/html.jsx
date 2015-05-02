
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
    javascripts = this.props.javascripts;
    return (
      <html>
        <Html.Head {...this.props} />
        <body>
          {this.props.children}
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
      styles: false,
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
    stylesheets = this.props.stylesheets;
    var styles = false;
    if (this.props.styles) {
      styles = <style dangerouslySetInnerHTML={{ __html: this.props.styles }} />;
    }
    return (
      <head>
        <meta charSet="utf-8" />
        <title>{this.props.title}</title>
        <meta name="description" content={this.props.description} />
        <meta name="author" content={this.props.author} />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        {this.renderFavicon()}
        {styles}
        {stylesheets.map(this.renderStylesheet)}
      </head>
    )
  }

});



module.exports = Html;

