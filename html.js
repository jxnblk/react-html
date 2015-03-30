
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
      React.createElement("html", null, 
        React.createElement(Html.Head, React.__spread({},  this.props)), 
        React.createElement("body", null, 
          this.props.children, 
          React.createElement("script", {dangerouslySetInnerHTML: init}), 
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
    var stylesheets = [];
    if (this.props.stylesheet) {
      stylesheets = [this.props.stylesheet];
    } else if (this.props.stylesheets) {
      stylesheets = this.props.stylesheets;
    }
    return (
      React.createElement("head", null, 
        React.createElement("meta", {charSet: "utf-8"}), 
        React.createElement("title", null, this.props.title), 
        React.createElement("meta", {name: "description", content: this.props.description}), 
        React.createElement("meta", {name: "author", content: this.props.author}), 
        React.createElement("meta", {name: "viewport", content: "width=device-width,initial-scale=1.0"}), 
        this.renderFavicon(), 
        stylesheets.map(this.renderStylesheet)
      )
    )
  }

});



module.exports = Html;

