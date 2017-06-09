function registerNewApp(name)
{
    //Register new app here (not made yet).

    //Return the app client ID.
    return '8426ba9f-86c5-4aa3-b5b1-55b3d84f1362';
}

//Send the initial GET request to the server to obtain the authentication CODE.
function askForAuthenticationCode()
{
    console.log("Sending initial GET request for authentication code!");

    //Send a GET request via jQuery.
    $.get(
        //The URL to authorize on.
        "http://0.0.0.0:3000/api/oauth/authorize",

        //The data required.
        {
            response_type: 'code',
            client_id: registerNewApp("Test App"), //Replace this when permanently determined.
            redirect_uri: 'http://localhost:63342/Custom%20Application/public/callback.html', //I'm not sure whether this is actually the right callback, but I'll have to test to see.
            scope: 'user/*.*',
            state: 'randomstringwedontcareabout'  //Can be literally anything (not sure what it's used for)
        },

        //The data for the function.
        function (data, status)
        {
            //Make sure that the request was successful.
            if (status === "success")
            {
                //Output to the user that the request for the token was successful!
                console.log("YAS the request was successful!");
            }
            else
                //Output to the user that the request failed :(
                console.log("Oh noes!  The request failed!");
        }
    );
}

//Called back from callback.html (custom written)
function askForAuthenticationToken(authenticationCode)
{
    console.log("(Would be) Sending POST request for authentication token!");
    /*
    //Ask for token here.
    $.post(
        //The URL to obtain the authentication token from.
        "http://0.0.0.0:3000/api/oauth/token",

        //The data required.
        {
            //Don't remember required token params, I'll look this up.
        },

        function (data, status)
        {
            //Make sure that the request was successful.
            if (status === "success")
            {
                //Output to the user that the request for the token was successful!
                console.log("YAS the request was successful!");
            }
            else
            //Output to the user that the request failed :(
                console.log("Oh noes!  The request failed!");
        }
    );
    */
}