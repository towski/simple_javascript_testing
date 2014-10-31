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
