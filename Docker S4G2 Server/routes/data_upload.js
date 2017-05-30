'use strict'

var express = require('express');
var requestify = require('requestify');
var server_config = require('../configs').servers;
var router = express.Router();

router.post('/data', function(req, res){
    console.log(req.body);
    var resource_data = req.body.resource;
    var headers = {
            'Content-Type': 'application/json'
      }
    if( resource_data.resourceType === 'Bundle' ){
        console.log('Bundle')
        requestify.post(server_config.fhirServer, resource_data, {
            headers:headers
        }).then(function(response){
            res.json({
                isSuccessful:true
            })
        }).fail(function(response){
            res.json({
                isSuccessful:false,
                error:response.getBody()
            })
        });
    }else{
        console.log('single');
        requestify.post(server_config.fhirServer + '/' + resource_data.resourceType, resource_data, {
            headers:headers
        }).then(function(response){
            res.json({
                isSuccessful:true
            })
        }).fail(function(response){
            res.json({
                isSuccessful:false,
                error:response.getBody()
            })
        });
    }
});

module.exports = router;