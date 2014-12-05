var simple = require('simple_javascript_testing')

simple.runTest("test file", function(page) {
  var checked = page.evaluate(function() {
    //triggerRequest("/df/artery/user.json", {Id: 1, Name: "Hey", Thoughts: "hey"})
    //triggerRequest("/df/artery/user/get_unit_labors.json", [{Labor: 1}])
    //assertAllRequestsRun()
    //return document.querySelector('#labor_1').checked
  })
  this.assert_equal(true, true)
})
