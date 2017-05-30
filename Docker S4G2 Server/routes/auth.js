'use strict'
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
var router = require("express").Router();
var config = require('../configs');
var server_config = config.servers;
let appAction = require('../services/appAction');

let app_verify = appAction.app_verify;

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
Object.assign = require('object-assign');

function normalizeURL(url) {
  if (url.endsWith('/')) {
    url = url.substring(0, url.length - 1);
  }
  return url.toLowerCase();
}

router.get("/authorize", function(req, res){
    // if (normalizeURL(req.query.aud) != normalizeURL(server_config.baseUrl + '/api/fhir')) {
    //     //TODO: follow oauth spec here
    //     console.log("Bad AUD value: " + req.query.aud + " (expecting " + server_config.baseUrl + '/api/fhir)');
    //     res.send("Bad audience value", 400);
    //     return;
    // }
    console.log(req.query.redirect_uri);
    // verity app information
    if( req.query.redirect_uri == null || req.query.client_id == null || req.query.scope == null || !app_verify(req.query.client_id, req.query.redirect_uri, req.query.scope) ){
        console.log("Bad Client Info");
        res.send("Bad Client Info", 400);
        return;
    }
    console.log('app info verified');
    var incomingJwt = req.query.launch && req.query.launch.replace(/=/g, "");
    var code = {
        context: incomingJwt && jwt.decode(incomingJwt) || {},
        client_id: req.query.client_id,
        scope: req.query.scope
    };
    var state = req.query.state;
    var signedCode = jwt.sign(code, server_config.jwtSecret, { expiresIn: "5m" });
    console.log(signedCode)
    res.redirect(req.query.redirect_uri + ("?code=" + signedCode + "&state=" + state));
});

router.post('/token', function(req, res){
    console.log(req.body);
    var grantType = req.body.grant_type;
    var codeRaw;

    if (grantType === 'authorization_code') {
        codeRaw = req.body.code;
    } else if (grantType === 'refresh_token') {
        codeRaw = req.body.refresh_token;
    }
    try {
        var code = jwt.verify(codeRaw, server_config.jwtSecret);
    } catch (e) {
        console.log(e);
        return res.status(401).send("invalid token");
    }
    console.log(code);
    code.context['refresh_token'] = jwt.sign(code, server_config.jwtSecret);

    var token = Object.assign({}, code.context, {
        token_type: "bearer",
        expires_in: 3600,
        scope: code.scope,
        client_id: req.body.client_id
    });
    token.access_token = jwt.sign(Object.assign({}, token), server_config.jwtSecret, { expiresIn: "1h" });
    res.json(token);
});

module.exports = router;