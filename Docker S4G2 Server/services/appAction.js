'use strict';

let models = require('../models');
let User = models.User;
let UserDao = models.UserDao;
let App = models.App;
let AppDao = models.AppDao;
var uuid = require('node-uuid');
let userAction = require('./userAction');
let scopeAction = require('./scopeAction');

/**
 * This method verifies a given app, and outputs on the terminal console whether or not the app was verified successfully in addition to what exactly went wrong.
 *
 * @param client_id: the client ID for the previously registered application.
 * @param redirect_uri: the URL to redirect to after successfully verifying the application, with the code and state param.
 * @param scopes: the scope in which the application is working.
 * @returns {*}: a boolean which indicates whether or not the app was verified.
 * @author: Written by Dr. Alterovitz's group, edited by Makiah.
 */
let appIsValid = function(client_id, redirect_uri, scopes)
{
    //Make sure that a client ID was provided.
    if (client_id === null)
    {
        console.log("No client ID was provided!  Cannot verify application :(");
        return false;
    }

    //Make sure that a client ID was provided.
    if (redirect_uri === null)
    {
        console.log("No redirect URI was provided!  Cannot verify application :(");
        return false;
    }

    //Make sure that a client ID was provided.
    if (scopes === null)
    {
        console.log("No scope(s) were provided!  Cannot verify application :(");
        return false;
    }

    //Attempt to verify the application.
    let scope_list = scopes.split(/\+/);
    let app_obj = AppDao.findOne({
        client_id:client_id
    });

    //Return whether this application was successfully found!
    let successfullyVerified = app_obj && app_obj.redirect_uri === redirect_uri && scope_compare(scope_list, app_obj);
    console.log(successfullyVerified ? "Application successfully verified :)" : "Application could not be verified :(");
    return successfullyVerified;
};

var app_verify_scope = function(client_id, scopes){
    let scope_list = scopes.split(/\+/);
    console.log('Verifying Application...');
    console.log(client_id);
    let app_obj = AppDao.findOne({
        client_id:client_id
    });
    console.log(app_obj);

    return app_obj && scope_compare(scope_list, app_obj);
};

var scope_compare = function(scopes, app_obj){
    var app_scopes = scopeAction.oarray2sarray(app_obj.scopes);
    console.log(app_scopes);
    if( scopes.length != app_scopes.length ){
        return false;
    }
    for( var i = 0; i < scopes.length; i++ ){
        if ( scopes[i] != app_scopes[i] ){
            console.log(scopes[i])
            return false;
        }
    }
    return true;
};

var app_info_validate = function(app_info){
    var is_valid = true;
    if( !app_info || !app_info.name || app_info.name.length == 0 || !app_info.redirect_uri ){
        is_valid = false;
    }
    if( !app_info.is_stand_alone && (!app_info.launch_uri || pp_info.launch_uri.length == 0) ){
        is_valid = false;
    }
    console.log(is_valid);
    return is_valid;
};

var app_register = function(app_info, username)
{
    var user_obj = userAction.get_user_obj(username);
    console.log(user_obj.toObject({}));
    if( !app_info_validate(app_info) || !user_obj ){
        return null;
    }
    var client_id = uuid.v4();
    console.log('client_id: '+client_id);
    var scope_objs = scopeAction.sarray2oarray(app_info.scopes);
    if( !scope_objs ){
        console.log('scope error');
        return null;
    }
    var new_app = new App({
        name : app_info.name,
        author : user_obj,
        scopes: scope_objs,
        is_stand_alone: app_info.is_stand_alone,
        launch_uri: app_info.is_stand_alone ? app_info.launch_uri : null,
        redirect_uri: app_info.redirect_uri,
        is_patient_required : app_info.is_patient_required,
        client_id:client_id
    });
    AppDao.create(new_app);
    return client_id;
};

var update_app = function(client_id, app_info, username){
    var res = {
        isSuccessful: false,
        error: ''
    }
    var app_obj = AppDao.findOne({client_id:client_id});
    if( !app_obj ){
        res.isSuccessful = false;
        res.error = 'No Such App';
        return res;
    }
    if( app_obj.author.username != username ){
        res.isSuccessful = false;
        res.error = 'Invalid User';
        return res;
    }
    app_obj.name = app_info.name ? app_info.name : app_obj.name;
    app_obj.scopes = app_info.scopes ? scopeAction.sarray2oarray(app_info.scopes) : app_obj.scopes;
    app_obj.is_stand_alone = app_info.is_stand_alone != undefined ? app_info.is_stand_alone : app_obj.is_stand_alone;
    app_obj.launch_uri = app_info.launch_uri ? app_info.launch_uri : app_obj.launch_uri;
    app_obj.redirect_uri = app_info.redirect_uri ? app_info.redirect_uri : app_obj.redirect_uri;
    AppDao.update(app_obj);
    res.isSuccessful = true;
    return res;

};

var get_app_info = function(client_id)
{
    var app_obj = AppDao.findOne({client_id:client_id});
    if( !app_obj ){
        return null;
    }
    var app_info = app_obj.toObject({recursive:true});
    app_info.scopes = scopeAction.oarray2sarray(app_info.scopes);
    return app_info;
};

var get_app_info_by_id = function(app_id)
{
    var app_obj = AppDao.findOne({id:app_id});
    if( !app_obj ){
        return null;
    }
    return app_obj.toObject({recursive:true});
};

module.exports = {
    app_info_validate,
    app_register,
    appIsValid,
    get_app_info,
    get_app_info_by_id,
    app_verify_scope,
    update_app
};