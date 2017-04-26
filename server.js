// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var flash 		   = require('flash');
//==================================================================

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(flash());

// routes ==================================================
//require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
var server = app.listen(process.env.PORT || 8080, "0.0.0.0", function ()
{
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
//
// //See if we can do a GET request from here.
// var options = {
//     response_type: 'code',
//     path: '/index.html'
// };
// http.get();

exports = module.exports = app; // expose app
