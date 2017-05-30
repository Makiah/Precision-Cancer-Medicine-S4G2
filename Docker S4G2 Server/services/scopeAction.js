'use strict'

let models = require('../models');
let Scope = models.Scope;
let ScopeDao = models.ScopeDao;

var obj2str = function(scope_obj){
    var result = '';
    if( scope_obj.role ){
        result += scope_obj.role + "/"
    }
    if( scope_obj.resource ){
        result += scope_obj.resource + "."
    }
    if( scope_obj.operation ){
        result += scope_obj.operation;
    }
    
    return result;
}

var str2obj = function(scope_str){
    console.log('scope '+ scope_str);
    var role = scope_str.slice(0, scope_str.indexOf('/'));
    var resource = scope_str.slice(scope_str.indexOf('/')+1, scope_str.indexOf('.'));
    var operation = scope_str.slice(scope_str.indexOf('.')+1);
    console.log({
        role:role,
        resource:resource,
        operation:operation
    });
    var scope_obj = ScopeDao.findOne({
        role:role,
        resource:resource,
        operation:operation
    });
    console.log(scope_obj);
    return scope_obj;
}

var get_all_scopes = function(){
    var scopes = ScopeDao.find({});
    return oarray2sarray(scopes)
}

var get_all_scopes_obj = function(){
    var scopes = ScopeDao.find({});
    return scopes;
}

var oarray2sarray = function(scopes){
    var results = [];
    scopes.forEach(function(scope){
        results.push(obj2str(scope));
    });
    return results;
}

var sarray2oarray = function(scopes){
    console.log('analyzing scopes' + scopes);
    var results = [];
    scopes.forEach(function(scope){
        results.push(str2obj(scope));
    });
    return results;
}

module.exports = {
    get_all_scopes,
    get_all_scopes_obj,
    oarray2sarray,
    sarray2oarray
}