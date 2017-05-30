var express = require('express');
var router = express.Router();
var send_fhir = require('../services/send_fhir.js')

router.get('/', function(req, res, next){
    var auth = req.headers['authorization']
    var originUrl = req.originalUrl.replace('/fhir/', '');
    send_fhir.send_get(originUrl, req, res);
});

router.get('*', function(req, res, next){
    var auth = req.headers['authorization']
    var originUrl = req.originalUrl.replace('/fhir/', '');
    send_fhir.send_get(originUrl, req, res);
});

router.post('*', function(req, res, next){
    var auth = req.headers['authorization']
    var originUrl = req.originalUrl.replace('/fhir/', '');
    var req_data = req.body;
    send_fhir.send_post(originUrl, req, res, req_data, auth)
});

module.exports = router;