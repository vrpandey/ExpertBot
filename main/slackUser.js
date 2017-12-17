var config = require("./config")

function getUserName(email_id, callback) {
    var auth_slack_token = config.slack_token;
    var url = 'https://slack.com/api/users.list?token=' + auth_slack_token;
    var request = require('request');
    var userName = null;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(response.body);
            for (var i = 0; i < body.members.length; i++) {
                var email = body.members[i].profile.email;
                if (email == email_id) {
                    userName = body.members[i].id;
                    console.log(userName);
                    callback(userName);
                }
            }
        }
        callback(null);
    });
}

function getName(userid, callback) {
    var auth_slack_token = config.slack_token;
    var url = 'https://slack.com/api/users.list?token=' + auth_slack_token;
    var request = require('request');
    var userName = null;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(response.body);
            for (var i = 0; i < body.members.length; i++) {
                var id = body.members[i].id;
                if (userid == id) {
                    name = body.members[i].name;
                    console.log(name);
                    callback(name);
                }
            }
        }
        callback(null);
    });

}

exports.getUserName = getUserName;
exports.getName = getName;
