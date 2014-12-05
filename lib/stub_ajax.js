var all_requests = {}
var all_requests_length = 0

XMLHttpRequest.prototype.open = function(method, url){
  all_requests_length += 1
  all_requests[url] = {onload: this.onload}
}

function triggerRequest(url, data){
  var request = all_requests[url]
  all_requests_length -= 1
  request.response = JSON.stringify(data)
  request.status = 200
  request.onload(request)
}

function assertAllRequestsRun(){
  if (all_requests_length != 0){
    throw("some requests not called")
  }
}

XMLHttpRequest.prototype.send = function(){ }

function triggerRequest(url, data){
  var request = all_requests[url]
  all_requests_length -= 1
  request.response = JSON.stringify(data)
  request.status = 200
  request.onload(request)
}

MockChannel = function(name){ 
  this.initialize(name)
}

var all_channels = {}
MockChannel.prototype = {
  events: {},
  initialize: function(name){
    this.name = name
  },
  bind: function(event, callback){
    this.events[event] = callback
  },
  triggerEvent: function(event, data){
    this.events[event](data)
  }
}

WebSocketRails.prototype.subscribe = function(channel){
  var new_channel = new MockChannel("channel")
  all_channels[channel] = new_channel
  return new_channel
}
