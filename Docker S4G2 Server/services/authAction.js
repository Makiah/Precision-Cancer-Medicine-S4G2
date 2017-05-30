'use strict'

let models = require('../models');
let Scope = models.Scope;
let App = models.App;
let appAction = require('./appAction');

let app_verify_scope = appAction.app_verify_scope;

var verify_token = function(token, req_url, body, options){
    // verify time
    // var time_diff = new Date().getTime() / 1000 - token.exp;
    // if( time_diff > 0){
    //     return {isSuccessful: false, msg:'Token Expired'};
    // }
    // verify Scope
    var scope = token.scope;
    console.log(token.client_id);
    if( !app_verify_scope(token.client_id, token.scope) ){
        return {isSuccessful: false, msg:'Invalid Token'};
    }
    // var isSuccessful = false;
    var scope_list = scope.split(/\+/);
    return {
        isSuccessful: verify_scope(req_url, body, options, scope_list),
        msg:''
    };
}

var verify_scope = function(req_url, body, options ,scopes){
    console.log(scopes);
    //verify scope resource.operation
    var resource_types = [req_url.split('\/')[1]];
    if( resource_types[0].length == 0 && body && body.resourceType && body.resourceType === "Bundle"){
        Array.prototype.push.apply(resource_types, extract_resource_type(body));
    }
    console.log(resource_types);
    var operation = options.method === 'GET' ? 'read' : 'write';
    console.log(operation)
    // TODO: add user role verify
    // get scope reource and operation
    var scope_resources = [];
    var scope_operations = [];
    for( var i = 0; i < scopes.length; i++ ){
        var scope = scopes[i].split('\.');
        scope_resources.push(scope[0].split('\/')[1]);
        scope_operations.push(scope[1]);
    }
    console.log(scope_resources);
    console.log(scope_operations);
    var is_resource_authorized = true;
    var is_operation_authorized = true;
    if( scope_resources.indexOf('*') > -1 ){
        is_resource_authorized = true;
    }else{
        for( var i = 0; i < resource_types.length; i++ ){
            if( scope_resources.indexOf(resource_types[i]) < 0 ){
                is_resource_authorized = false;
                break;
            }
        }
    }
    if( scope_operations.indexOf('*') > -1 || scope_operations.indexOf(operation) > -1 ){
        is_operation_authorized = true;
    }else{
        is_operation_authorized = false;
    }
    return is_resource_authorized && is_operation_authorized;
}

var extract_resource_type = function(body){
    var resource_types = [];
    body.entry.forEach(function(resource){
        resource_types.push(resource.resource.resourceType);
    });
    return resource_types;
}

module.exports = {
    verify_token
}