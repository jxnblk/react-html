
var React = require('react');

var Head = React.createClass({displayName: "Head",
  render: function() {
    return (
      React.createElement("head", null, 
        React.createElement("meta", {charSet: "utf-8"}), 
        React.createElement("title", null, this.props.title), 
        React.createElement("meta", {name: "viewport", content: "width=device-width,initial-scale=1.0"}), 
        React.createElement("link", {rel: "stylesheet", href: this.props.stylesheet})
      )
    )
  }
});

module.exports = React.createClass({displayName: "exports",

  renderScript: function() {
    console.log('html props', this.props.script);
    if (!this.props.script) { return false; }
    return (React.createElement("script", {src: this.props.script}));
  },

  render: function() {
    var init = {
      __html: "window.INITIAL_PROPS = " + JSON.stringify(this._owner.props) + ";\n"
    };
    return (
      React.createElement("html", null, 
        React.createElement(Head, React.__spread({},  this.props)), 
        React.createElement("body", null, 
          this.props.children, 
          React.createElement("script", {dangerouslySetInnerHTML: init}), 
          this.renderScript()
        )
      )
    )
  }

});

