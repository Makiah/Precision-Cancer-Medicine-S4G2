'use strict'
let config = require('../configs');

let um = require('unique-model');
let Types = um.Types;
let Text = Types.Text;
let Integer = Types.Integer;
let Double = Types.Double;
let Bool = Types.Bool;
let DateTime = Types.DateTime;
let UObject = Types.UObject;
let UObjectArray = Types.UObjectArray;

um.enablePersist();
let session = um.createSession(config.database);

let User = um.model.createModel('User', {
    username: Text(),
    password: Text(),
    email: Text(),
    is_admin: Bool()
});

let Scope = um.model.createModel('Scope', {
    role:Text(),
    resource: Text(),
    operation: Text()
});

let App = um.model.createModel('App', {
    name: Text(),
    author: UObject({
        type: 'User'
    }),
    client_id:Text(),
    launch_uri: Text(),
    redirect_uri: Text(),
    logo_file: Text(),
    is_stand_alone: Bool(),
    is_patient_required: Bool(),
    scopes:UObjectArray({
        type:'Scope'
    })  
});

let UserDao = session.getDao(User);
let AppDao = session.getDao(App);
let ScopeDao = session.getDao(Scope)

module.exports = {
    User,
    UserDao,
    App,
    AppDao,
    Scope,
    ScopeDao
}