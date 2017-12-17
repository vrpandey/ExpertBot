
var Client = require('node-rest-client').Client;
client = new Client();
// Provide user credentials, which will be used to log in to JIRA.
var loginArgs = {
        data: {
                "username": "arattili@ncsu.edu",
                "password": "Password"
        },
        headers: {
                "Content-Type": "application/json"
        } 
};
client.post("https://arattili.atlassian.net/rest/auth/1/session", loginArgs, function(data, response){
        if (response.statusCode == 200) {
                var session = data.session;
                // Get the session information and store it in a cookie in the header
                var searchArgs = {
                        headers: {
								// Set the cookie from the session information
                                cookie: session.name + '=' + session.value,
                                "Content-Type": "application/json"
                        },
                        data: {
								// Provide additional data for the JIRA search. You can modify the JQL to search for whatever you want.
                                jql: ""
                        }
                };
				// Make the request return the search results, passing the header information including the cookie.
                client.get('https://arattili.atlassian.net/rest/api/2/search?jql=project=NH', searchArgs, function(searchResult, response) {
                        console.log('search result:', searchResult.issues.length);
                        for( var i = 0; i < searchResult.issues.length; i++ )
                        {
                            var assigneeName = "not mentioned";
                            var assigneeEmail = "not mentioned";
                            if(searchResult.issues[i].fields.assignee!= null)
                            {
                                assigneeName = searchResult.issues[i].fields.assignee.displayName;
                                assigneeEmail = searchResult.issues[i].fields.assignee.emailAddress;
                            }
                            var summary = searchResult.issues[i].fields.summary;
                            var resolution = searchResult.issues[i].fields.resolution;
                            var status = "INCOMPLETE";
                            if(resolution!= null)
                            {
                                status = searchResult.issues[i].fields.resolution.name;
                            }
                            console.log("| ", summary," |", status,", ", assigneeName,",", assigneeEmail );
                        }
                });
        }
        else {
                throw "Login failed :(";
        }
});



