'use strict';
var express = require('express');
var router = express.Router();
var appAction = require('../services/appAction');
let scopeAction = require('../services/scopeAction');
let app_register = appAction.app_register;
let get_app_info = appAction.get_app_info;
let update_app = appAction.update_app;
/* GET home page. */
router.post('/register',function(req, res){
    if( !req.session.isLoggedIn ){
        req.json({
            isSuccessful: False,
            error: "No user logged in"
        });
    }
    var username = req.session.username;
    var isSuccessful = true;
    var client_id = app_register(req.body, username);
    console.log('client-id get ' + client_id);
    if( !client_id ){
        isSuccessful = false;
    }
    res.json({
        isSuccessful:isSuccessful,
        client_id:client_id
    });
});

router.get('/scopes', function(req, res){
    var scopes = scopeAction.get_all_scopes();
    res.json(scopes);
});

router.post('/update', function(req, res){
    if( !req.session.isLoggedIn ){
        return res.json({
            isSuccessful:false,
            error: 'No Auth'
        });
    }
    var client_id = req.body.client_id;
    var app_info = req.body.app_info;
    res.json(update_app(client_id, app_info, req.session.username))
})

router.get('/appInfo', function(req, res){
    if( !req.session.isLoggedIn ){
        return res.json({
            isSuccessful:false,
            error: 'Invalid user'
        });
    }
    var client_id = req.query.client_id;
    var app_info = get_app_info(client_id);
    if( app_info.author.username === req.session.username ){
        return res.json({
            isSuccessful:true,
            app_info: get_app_info(client_id)
        });
    }else{
        return res.json({
            isSuccessful:false,
            error: 'Invalid User'
        });
    }
});

module.exports = router;
