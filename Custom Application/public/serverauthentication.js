//Modules
var express 	= require('express');
var app 		= express();
var bodyParser 	= require('body-parser');
var flash 		= require('flash');
var request 	= require('request');

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(flash());

//Send the initial GET request to the server to obtain the authentication CODE.
function beginAuthenticationSequence()
{
    request.get(
        //The URL to call the request on.
        'http://0.0.0.0:3000/api/oauth/authorize',
        {
            //The parameters to call the GET request with.
            json: {
                response_type: 'code',
                client_id: '(app_client_id)', //Replace this when running it.
                redirect_uri: 'http://0.0.0.0:3000/index.html', //I'm not sure whether this is actually the right callback, but I'll have to test to see.
                scope: 'user/*.*',
                state: 'randomstringwedontcareabout' //Can be literally anything (not sure what it's used for)
            }
        },

        //The callback function on the request (I think)
        function (error, response, body)
		{
		    //Make sure that an error was not returned.
            if (!error && response.statusCode == 200)
            {
                //Output to the user that the request for the token was successful!
                console.log("YAS the request was successful!");
                console.log("Response was " + response.message);
                console.log("Body was " + body.message);
                console.log("Beginning stage 2: obtaining authentication TOKEN");

                //Stage 2: the POST request which obtains the authentication token.
                request.post(
                	//The URL to call the request on.
					'http://0.0.0.0:3000/api/oauth/token',
					{
						json: {
							grant_type: 'authorization_code',
							code: response.arguments[0], //For some reason this does not like when we use "use strict"
							redirect_uri: "http://0.0.0.0:3000/index.html"
						}
					},

                    //The callback function for the second object.
                    function (error2, response2, body2)
                    {
                        if (!error2 && response2.statusCode == 200)
                        {
                            console.log("Success!  Authentication token successfully obtained!");
                        }
                        else
                            console.log("Oh noes!  The authentication token could not be obtained!");

                        //Output all components.
                        console.log("Response was " + response2.message);
                        console.log("Error was " + error2.message);
                        console.log("Body was " + body2.message);
                    }
				);
            }
            else
                //Output to the user that the request failed :(
                console.log("Oh noes!  The request failed!");

            //Output all callback function components.
            console.log("Response was " + response.message);
            console.log("Error was " + error.message);
            console.log("Body was " + body.message);
        }
    );
}