
var React = require('react');

var Html = React.createClass({displayName: "Html",

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
    return (React.createElement("script", {src: script, key: 'script-' + i}));
  },

  render: function() {
    javascripts = this.props.javascripts;
    return (
      React.createElement("html", null, 
        React.createElement(Html.Head, React.__spread({},  this.props)), 
        React.createElement("body", null, 
          this.props.children, 
          javascripts.map(this.renderScript)
        )
      )
    )
  }

});

Html.Head = React.createClass({displayName: "Head",

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
      React.createElement("link", {rel: "stylesheet", href: stylesheet, key: 'stylesheet-' + i})
    )
  },

  renderFavicon: function() {
    if (!this.props.favicon) return false;
    return React.createElement("link", {rel: "icon", href: this.props.favicon})
  },

  render: function() {
    stylesheets = this.props.stylesheets;
    var styles = false;
    if (this.props.styles) {
      styles = React.createElement("style", {dangerouslySetInnerHTML: { __html: this.props.styles}});
    }
    return (
      React.createElement("head", null, 
        React.createElement("meta", {charSet: "utf-8"}), 
        React.createElement("title", null, this.props.title), 
        React.createElement("meta", {name: "description", content: this.props.description}), 
        React.createElement("meta", {name: "author", content: this.props.author}), 
        React.createElement("meta", {name: "viewport", content: "width=device-width,initial-scale=1.0"}), 
        this.renderFavicon(), 
        styles, 
        stylesheets.map(this.renderStylesheet)
      )
    )
  }

});



module.exports = Html;

