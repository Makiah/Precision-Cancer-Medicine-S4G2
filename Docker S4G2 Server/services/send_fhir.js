var requestify = require('requestify');
var configs = require('../configs').servers;

var doGet = function(url, res, access_token=null){
  var headers = {
            'Accept': 'application/json'
      }
  if( access_token!=null ){
    headers['Authorization'] = access_token
  }
  requestify.get(url, {
  headers :headers
  }).then(function(response){
    res.send(response.getBody());
  }).fail(function(response){
      res.status(response.getCode())
      res.send(response.getBody());
    });;
}

var doPost = function(url, data, res, access_token=null){
  var headers = {
            'Content-Type': 'application/json'
      }
  if( access_token!=null ){
    headers['Authorization'] = access_token
  }
  requestify.post(url, data, {
      headers:headers
    }).then(function(response){
      res.send(response.getBody());
    }).fail(function(response){
      res.status(response.getCode())
      res.send(response.getBody());
    });
}

var doPut = function(url, data, res, access_token=null){
  var headers = {
            'Accept': 'application/json'
      }
  if( access_token!=null ){
    headers['Authorization'] = access_token
  }
  requestify.put(url, data,{
    headers:headers
  }).then(function(response){
    res.send(response.getBody());
  }).fail(function(response){
      res.status(response.getCode())
      res.send(response.getBody());
    });;
}

var doDelete = function(url, res, access_token=null){
  var headers = {
            'Accept': 'application/json'
      }
  if( access_token!=null ){
    headers['Authorization'] = access_token
  }
  requestify.delete(url, {
  headers :headers
  }).then(function(response){
    res.send(response.getBody());
  }).fail(function(response){
      res.status(response.getCode())
      res.send(response.getBody());
    });;
}

var send_get = function(path, req, res, access_token=null){
    var url = configs.hapi_url;
    if( !configs.hapi_url.endsWith('/') ){
        url += '/';
    }
    url += path;
    doGet(url, res, access_token);
}

var send_post = function(path, req, res, data, access_token=null){
  var url = configs.hapi_url;
    if( !configs.hapi_url.endsWith('/') ){
        url += '/';
    }
    url += path;
    console.log(data)
    doPost(url, data, res, access_token);
}

module.exports = {
    send_get:send_get,
    send_post:send_post
}