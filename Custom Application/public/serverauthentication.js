//Send the initial GET request to the server to obtain the authentication CODE.
function beginAuthenticationSequence()
{
    console.log("Sending initial GET request for authentication code!");

    //Send a GET request via jQuery.
    $.get(
        //The URL to authorize on.
        "http://0.0.0.0:3000/api/oauth/authorize",

        //The data required.
        {
            response_type: 'code',
            client_id: '93e64628-92a0-43b9-9bca-bdefd55590a2', //Replace this when running it.
            redirect_uri: 'http://127.0.0.1:63342/Custom%20Application/public/index.html', //I'm not sure whether this is actually the right callback, but I'll have to test to see.
            scope: 'user/*.*',
            state: 'randomstringwedontcareabout'  //Can be literally anything (not sure what it's used for)
        },

        //The data for the function.
        function (data, status)
        {
            //Make sure that the request was successful.
            if (status.statusCode == 200)
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