'use strict'
var express = require('express');
var router = express.Router();
var userAction = require('../services/userAction');

var register = userAction.registerAction;
var login = userAction.loginAction;
let get_user_apps = userAction.get_user_apps;
/* GET users listing. */
router.post('/login', function(req, res, next) {
  if( req.session.isLoggedIn ){
    // already logged in
    res.redirect('/dashboard');
  }
  var isSuccessful = login(req.body);
  if( isSuccessful ){
    console.log('successful')
    // login successfully, create session
    req.session.isLoggedIn = true;
    req.session.username = req.body.username;
  }
  res.json({
    isSuccessful:isSuccessful,
    error: isSuccessful ? null : 'Invalid username or password'
  });
});

router.get('/apps', function(req, res, next){
  if( !req.session.isLoggedIn ){
    return res.json({isSuccessful:false});
  }
  console.log(req.session);
  res.json(get_user_apps(req.session.username));
});

router.get('/logout', function(req, res, next){
  if( req.session.isLoggedIn ){
    req.session.isLoggedIn = false;
    delete req.session['username'];
  }
  res.redirect('/');
});

router.post('/register', function(req, res, next) {
  var isSuccessful = register(req.body);
  if( isSuccessful ){
    console.log('successful')
    req.session.isLoggedIn = true;
    req.session.username = req.body.username;
  }
  res.json({
    isSuccessful:isSuccessful,
    error: isSuccessful ? null : 'Invalid username or password'
  });
})

module.exports = router;
