Simple Javascript Testing
=========================

Simple javascript testing for rails templates with phantomjs.

This library adds the method call_template_with_js to your tests, if you include SimpleJavascriptTesting.
This method builds the template you specify (ie users/index) and runs the javascript test file (test/javascript/users/index.js) against it. It stubs out any AJAX calls. 

example ruby test test/phantomjs/template_test.rb:
```ruby

require 'test_helper'
require 'simple_javascript_testing'

class TemplateTest < ActiveSupport::TestCase
  include SimpleJavascriptTesting

  def test_users_index
    call_template_with_js "users/index"
  end

  def test_dwarves_show
    civilization = Civilization.find_or_create_by :id => 100
    dwarf = civilization.dwarves.find_or_create_by :id => 10
    call_template_with_js "dwarves/show" do |data|
      data.set_instance_variable "dwarf", dwarf
    end
  end
end
```

and example js test file test/javascript/users/index.js:
```js
var simple = require('simple_javascript_testing')

simple.runTest("test file", function(page) {
  var checked = page.evaluate(function() {
    triggerRequest("/df/artery/user.json", {Id: 1, Name: "Hey", Thoughts: "hey"})
    triggerRequest("/df/artery/user/get_unit_labors.json", [{Labor: 1}])
    assertAllRequestsRun()
    return document.querySelector('#labor_1').checked
  })
  this.assert_equal(true, checked)
})

```
triggerRequest will manually trigger the callback for an AJAX request with the response you specify.
page is the phantomjs object

Install
====
To run, install the gem and the npm module into your project

`gem install simple_javascript_testing`

`npm install simple_javascript_testing`

and add simple_javascript_testing to your Gemfile


To run the tests:

npm install --force simple_javascript_testing
ruby test/simple_javascript_testing_test.rb
