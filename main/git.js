var request = require('request');
var fs = require("fs");
var config = require("./config")
var Promise = require('bluebird');
var parse = require('parse-link-header');
var google = require('./google.js');
var token = "token " + config.git_token;
var user_id = "samunot";
var url_root = "https://github.ncsu.edu/api/v3";

function getEmail(username, callback) {
    var options = {
        url: url_root + "/users/" + username,
        method: 'GET',
        json: { title: "Random1" },
        headers: {
            "User-Agent": "EnableIssues",
            "content-type": "application/json",
            "Authorization": token
        }
    };
    request(options, function(error, response, body) {
        var email = body.email;
        if (email != null) {
            console.log(email);
            callback(email);
        } else {
            console.log("User not found or email is private");
            callback(null);
        }
    });
}


function getIssues(repo_name, callback) {
    var options = {
        url: url_root + "/repos/" + user_id + "/" + repo_name + "/issues",
        method: 'GET',
        json: { title: "Random1" },
        headers: {
            "User-Agent": "EnableIssues",
            "content-type": "application/json",
            "Authorization": token
        }
    };
    request(options, function(error, response, body) {
        var obj = body;
        console.log(body)
        for (var i = 0; i < obj.length; i++) {
            var title = obj[i].title;
            for (var j = 0; j < obj[i].assignees.length; j++) {
                var user = obj[i].assignees[j].login;
                callback(user, title);
            }
        }
    });
}

function searchRepo(RepoName, callback) {
    var options = {
        url: url_root + "/user/repos",
        method: 'GET',
        headers: {
            "User-Agent": "EnableIssues",
            "content-type": "application/json",
            "Authorization": token
        }
    };
    request(options, function(error, response, body) {
        body = JSON.parse(body);
        var flag = false
        for (i = 0; i < body.length; i++) {
            if (RepoName == body[i].name) {
                flag = true;
                break;
            }
        }
        if (flag) {
            callback(1);
        } else {
            callback(0);
        }
    });
}

exports.getEmail = getEmail;
exports.getIssues = getIssues;
exports.searchRepo = searchRepo;