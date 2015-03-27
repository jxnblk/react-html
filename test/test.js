
var React = require('react');
var assert = require('assert');
var Html = require('..');
var validate = require('html-validator');
var colors = require('colors');

var rendered;
var props = {
  title: 'Test'
};

describe('react-html', function() {

  it('should render to string', function() {
    assert.doesNotThrow(function() {
      rendered = React.renderToString(React.createElement(Html, props));
    });
  });

  it('should render a string', function() {
    assert.equal(typeof rendered, 'string');
  });

  it('should produce valid html', function(done) {
    var html = '<!DOCTYPE html>' + rendered;
    validate({ data: html }, function(err, results) {
      if (err) throw err;
      results = JSON.parse(results);
      console.log('HTML validation'.cyan.underline);
      var errors = [];
      results.messages.forEach(function(m) {
        if (m.type === 'error') {
          errors.push(m);
          console.log(m.message.red.bold, m.extract.gray);
        } else {
          console.log(m.message.cyan, m.extract ? m.extract.gray : '');
        }
      });
      assert.equal(errors.length, 0);
      done();
    });
  });

});

