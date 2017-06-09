'use strict';

var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
var router = require("express").Router();
var config = require('../configs');
var server_config = config.servers;
let appAction = require('../services/appAction');

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

//The steps taken when the user attempts to obtain an authentication CODE, preceding token.
router.get("/authorize", function(req, res)
{
    //For aesthetic purposes :P
    console.log("");
    console.log("-----------");
    console.log("Verifying new application!");
    console.log("Client ID: " + req.query.client_id);
    console.log("Redirect URI: " + req.query.redirect_uri);
    console.log("Scope(s): " + req.query.scope);

    // if (normalizeURL(req.query.aud) != normalizeURL(server_config.baseUrl + '/api/fhir')) {
    //     //TODO: follow oauth spec here
    //     console.log("Bad AUD value: " + req.query.aud + " (expecting " + server_config.baseUrl + '/api/fhir)');
    //     res.send("Bad audience value", 400);
    //     return;
    // }

    // Verify the given application (the app_verify method will give us everything that is required).
    if(!appAction.appIsValid(req.query.client_id, req.query.redirect_uri, req.query.scope)) //Mentiones whether verification was successful.
    {
        res.send("Bad Client Info", 400);
        return;
    }

    //Obtain the code.
    let incomingJwt = req.query.launch && req.query.launch.replace(/=/g, "");
    let code = {
        context: incomingJwt && jwt.decode(incomingJwt) || {},
        client_id: req.query.client_id,
        scope: req.query.scope
    };
    let state = req.query.state;
    let signedCode = jwt.sign(code, server_config.jwtSecret, { expiresIn: "5m" });

    //Send the code and its parameters back to the recipient's callback URL.
    let redirectURL = req.query.redirect_uri + ("?code=" + signedCode + "&state=" + state);
    console.log("Redirecting to : " + redirectURL);
    res.redirect(redirectURL);
});

//The steps taken when the user attempts to receive a TOKEN, following receiving a code.
router.post('/token', function(req, res)
{
    //For aesthetic purposes :P
    console.log("");
    console.log("-----------");
    console.log("Verifying new application!");
    console.log("Code: " + req.body.code);

    console.log(req.body);
    var grantType = req.body.grant_type;
    var codeRaw;

    if (grantType === 'authorization_code')
    {
        codeRaw = req.body.code;
    }
    else if (grantType === 'refresh_token')
    {
        codeRaw = req.body.refresh_token;
    }
    try
    {
        var code = jwt.verify(codeRaw, server_config.jwtSecret);
    }
    catch (e)
    {
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