var system = require('system')
var args = system.args

if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP && oThis
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

if (args.length === 1) {
  console.log('Try to pass some arguments when invoking this script!');
  phantom.exit()
}

var page = require('webpage').create()
page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log('CONSOLE: ' + msg ) //' (from line #' + lineNum + ' in "' + sourceId + '")');
}

var testObject = {
  assert_equal: function(a, b){
    if (a != b){
      console.log("assertion failed:", a, "not equal to", b)
    }
  }
}

exports.runTest = function(name, test){
  page.open("file:///" + args[1], function(status){
    try{
      test.bind(testObject)(page)
      console.log("test succeeded: " + name)
    } catch(e){
      console.log(e.stack)
      console.log("test failed: " + name)
    }
    phantom.exit()
  })
}
