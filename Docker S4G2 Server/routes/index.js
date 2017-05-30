'use strict'
var express = require('express');
var router = express.Router();
let userAction = require('../services/userAction');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', {});
});

router.get('/dashboard', function(req, res, next) {
  if( req.session.isLoggedIn ){
    res.render('dashboard.html', {});
  }else{
    res.redirect('/');
  }
  
});

router.get('/admin', function(req, res, next){
  // if( req.session.isLoggedIn && userAction.is_super_user(req.session.username) ){
  //   res.render('admin.html', {});
  // }else{
  //   res.redirect('/');
  // }
  res.render('admin.html', {});
})

module.exports = router;
