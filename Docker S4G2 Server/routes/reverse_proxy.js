'use strict'
var request = require("request");
var jwt = require("jsonwebtoken");
var replStream = require("replacestream");
var config = require("../configs");
var server_config = config.servers;
var authAction = require('../services/authAction');

module.exports = function (req, res) {
  var token = null;
  console.log(req.headers);
  if (req.headers.authorization && !server_config.is_open) {
    try {
      token = jwt.verify(req.headers.authorization.split(" ")[1], config.servers.jwtSecret);
    } catch (e) {
      console.log(e);
      return res.status(401).send("invalid token");
    }
  }
  console.log(token);
  
  var h2 = Object.assign({}, req.headers);
  console.log(h2);
  delete h2["host"];
  delete h2['authorization'];
  h2["content-type"] = "application/json";
  console.log(h2);
  if (req.url.match(/_format=.*json/i)) {
    h2['accept'] = "application/json+fhir";;
  } else if (req.url.match(/_format=.*xml/i)) {
    h2['accept'] = "application/xml+fhir";
  }

  

  var body = req.method === "POST" || req.method === "PUT" ? req.body : undefined;
  var options = {
    method: req.method,
    body: req.body,
    headers: {
      'content-type': 'application/json'
    }
  };
  if( options.body ){
    options.json = true;
  }
  console.log(req.url.split('\/'));
  var isAuth = authAction.verify_token(token, req.url, body, options);
  if( !isAuth.isSuccessful ){
    return res.status(401).send("invalid token");
  }
  options.url = config.servers.fhirServer + req.url;

  // if (req.headers.authorization && token.scope.indexOf("user/") < 0) {
  //   //this is probably too naive
  //   if (options.url.toLowerCase().search("patient") < 0) {
  //      options.url += (req.url.indexOf("?") > -1 ? "&" : "?") + "patient=" + token.patient;
  //   }
  // }

  if( options.headers.authorization ){
    delete options.headers.authorization;
  } 
  
  // check is ga4gh request
  if( req.url.split('\/').length > 1 && req.url.split('\/')[1] == 'gene' ){
    options.url = config.servers.ga4ghServer + req.url.replace('/gene','');
  }
  console.log("PROXY: " + options.url);
  console.log(options);
  // request(options)
  // .on('response', function(response) {
  //    var contentType = response.headers['content-type'];
  //    res.status(response.statusCode);
  //    contentType && res.type(contentType);
  // })
  // .pipe(res);
  request(options, function (error, response, body) {
    console.log(body);
    var contentType = response.headers['content-type']
    res.status(response.statusCode);
    res.type(contentType);
    res.json(body);
  });
};