'use strict'

let models = require('../models');
var bcrypt = require('bcrypt');
let User = models.User;
let UserDao = models.UserDao;
let App = models.App;
let AppDao = models.AppDao;

const saltRounds = 10;

var registerAction = function(user_info){
    var username = user_info.username;
    console.log(username);
    if( isUserExists(username) ){
        console.log('exists');
        return false;
    }
    var password = user_info.password;
    console.log(password);
    var hashed_password = bcrypt.hashSync(password, saltRounds);
    var new_user = new User({
        username:username,
        password:hashed_password,
        email: user_info.email ? user_info.email : null
    });
    UserDao.create(new_user);
    console.log(new_user.toObject({recursive:true}))
    return true;
}

var loginAction = function(user_info){
    var username = user_info.username;
    console.log(username);
    var user = UserDao.findOne({
        username:username
    });
    if( !user ){
        return false;
    }
    var user_obj = user.toObject({recursive:true});
    console.log(user_obj)
    var password = user_info.password;
    var isMatch = bcrypt.compareSync(password, user_obj.password);
    return isMatch;
}

var isUserExists = function(username){
    var users = UserDao.find({
        username:username
    });
    return users != null && users.length != 0;
}

var get_user_apps = function(username){
    var user_obj = get_user_obj(username);
    var res = [];
    if( user_obj ){
        var app_list = AppDao.find({author:user_obj});
        try{
            res = App.toObjectArray(app_list, {
                                recursive: true
                            });
        }
        catch(e){
            console.log(e);
        }
        
    }
    console.log(res);
    return res;
}

var get_user_obj = function(username){
    if( isUserExists(username) ){
        return UserDao.findOne({username:username});
    }
    return null;
}

var is_super_user = function(username){
    var user_obj = get_user_obj(username);
    if( user_obj && user_obj.is_admin ){
        return true;
    }else{
        return false;
    }
}

module.exports = {
    registerAction,
    loginAction,
    get_user_obj,
    get_user_apps,
    is_super_user
}