var google = require('./google.js');
var Botkit = require('botkit');
var git = require("./git.js");
var config = require("./config")
var slackUser = require("./slackUser.js")
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

var elastic = require("./elastic.js");
var SlackBot = require('slackbots');
var async = require('async');

var init = 0;
var date = 0;
var topics = 0;
var experts = [];
var topicSearch;
var controller = Botkit.slackbot({
    debug: false
        //include "log: false" to disable logging
        //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});
var started = false;

// connect the bot to a stream of messages
controller.spawn({
    token: config.slack_token

}).startRTM()


var userName = null;

controller.hears('start', 'direct_mention,direct_message', function(bot, message) {

    userName = message.user;
    slackUser.getName(message.user, function(name) {
        if (name) {
            userName = name;

        }
    });

    started = true;
    bot.startConversation(message, function(err, convo) {

        bot.reply(message, 'Hi' + '<@' + message.user + '>..Let\'s get started \n Type exit at any moment to quit the chat. \nTo populate/repopulate the Database, type \"update\"\n to find experts, type \"find\"');
        convo.stop();
    }); 
});

controller.hears('feedback', 'direct_mention,direct_message', function(bot, message) {
	elastic.listExperts(client, function(expertList) {
                    for (i = 0; i < expertList.length; i++) {
                        bot.reply(message, expertList[i]);
                    }
                    
		    bot.startConversation(message, function(err, convo) {
                    convo.addQuestion('Type expert name:', function(answer, convo) {

                        if (answer.text == 'exit') {
                            started = false;
                            convo.stop();
                        }

                        var expertFB = answer.text;
                        convo.next();
                        convo.addQuestion('Type what did he help you with:', function(answer, convo) {
                            if (answer.text == 'exit') {
                                convo.stop();
                            }
                            elastic.save(client, answer.text, expertFB, function() {
                                bot.reply(message, 'Feedback has been recorded!');
                                convo.next();
                            });
                        })

                    });
		});

                });
});

controller.hears('update', ['mention', 'direct_mention', 'direct_message'], function(bot, message) {

    if (!started) {
        bot.startConversation(message, function(err, convo) {
            bot.reply(message, 'First type start to begin the chat');
            convo.stop();
        });

    } else {

        bot.startConversation(message, function(err, convo) {
            // convo.next();

            convo.addQuestion('Please enter the repo', function(answer, convo) {
                if(answer.text == 'exit'){
                    started=false;
                    convo.stop();
                } else {
                    var RepoName = answer.text;
                    git.searchRepo(RepoName, function(status) {
                        if (status == 1) {
                            git.getIssues(RepoName, function(user, title) {
                                google.returnEntities(title, function(title) {
                                    elastic.save(client, title, user, function() {
                                        //bot.reply(message,title + ":" + user);
                                        convo.next();
                                    });
                                });
                            });
                        } else {
                            bot.reply(message, "Sorry, this repo doesn't exist");
                            convo.gotoThread('default')
                        }
                    });

                    init = 1

                }
            });
            convo.on('end', function(convo) {
                if (convo.status == "completed") {
                    //convo.next(); // continue with conversation
                    var msgs = [];
                    msgs.push('The issues from your git repository have been extracted and expert list is updated!');
                    msgs.push('To find an expert, type find');

                    var m = 0;

                    async.eachSeries(msgs, function(expert, callback) {
                        console.log(expert);

                        bot.reply(message, msgs[m], function() {
                            m++;
                            callback();
                        });


                        // Alternatively: callback(new Error());
                    });

                }
            });
        });

    }


});

controller.hears('exit', ['mention', 'direct_mention', 'direct_message'], function(bot, message) {


    bot.startConversation(message, function(err, convo) {
        started = false;
        convo.stop();
    });

});

controller.hears('find', ['mention', 'direct_mention', 'direct_message'], function(bot, message) {

    if (!started) {
        bot.startConversation(message, function(err, convo) {
            bot.reply(message, 'First type start to begin the chat');
            convo.stop();
        });

    } else {

        bot.startConversation(message, function(err, convo) {
            convo.addQuestion('Enter the topic', function(answer, convo) {
                if (answer.text == 'exit') {
                    started = false;
                    convo.stop();
                } else {


                    var keyword = answer.text;
                    topicSearch = keyword;
                    elastic.search(client, keyword, function(names) {
                        if (names != "sorry no results found") {
                            experts = [];

                            for (var i = 0; i < names.length; i++) {

                                if (userName != names[i]) {
                                    //experts.push(names[i]);
                                    experts.push(names[i]);
                                }


                            }

                            var k = 0;
                            // console.log(experts.length);

                           async.eachSeries(experts, function(expert, callback) {
				git.getEmail(expert, function(email) {
					if(email){
                                		bot.reply(message, (k + 1).toString() + ") " + email, function() {
                                    		k++;
                                    		callback();
                                		});
					}
					else{
						bot.reply(message, (k + 1).toString() + ") " + expert, function() {
                                    		k++;
                                    		callback();
                                		});
					}
				});
                                // Alternatively: callback(new Error());
                            }, function(callback) {
                                convo.next();
                            });




                            //convo.next();
                            convo.ask("Are you happy with the results: yes/no", function(answer, convo) {
                                var topic = answer.text;
                                if (topic == 'exit') {
                                    started = false;
                                    convo.stop();
                                } else if (topic == "yes") {
                                    convo.say("good");
                                    convo.next();
                                    convo.stop();

                                } else if (topic == 'no') {
                                    convo.gotoThread('default')
                                } else {
                                    bot.reply(message, "Incorrect input");
                                    convo.gotoThread('default')
                                }

                            });
                        } else {
                            bot.reply(message, "sorry no results found, Please enter new topic");
                        }
                    });

                }


            }, {}, 'default');
            convo.on('end', function(convo) {

                if (started && convo.status != "completed") {
                    bot.reply(message, "Awesome, if you want to ask these experts a question, just type \"ask\"");
                    topics = 1;
                    //topicSearch=keyword;

                }
            });
        });

    }


});

controller.hears('ask', ['mention', 'direct_mention', 'direct_message'], function(bot, message) {
    console.log(message)
        /*
        if (topics == 0 && init == 0) {
            bot.reply(message, "You haven't entered the git repository name or the data is outdated. Please enter \"start\" to load data");
        }
        */
    if (topics == 0) {
        bot.reply(message, "You haven't searched for an expert, please type \"find\" to find an expert");
    } else {


        var l = 0;
	    
        async.eachSeries(experts, function(expert, callback) {
            git.getEmail(expert, function(email) {
					if(email){
                                		bot.reply(message, (l + 1).toString() + ") " + email, function() {
                                    		l++;
                                    		callback();
                                		});
					}
					else{
						bot.reply(message, (l + 1).toString() + ") " + expert, function() {
                                    		l++;
                                    		callback();
                                		});
					}
				});
            // Alternatively: callback(new Error());
        }, function(callback) {
            //convo.next();



            bot.startConversation(message, function(err, convo) {
                convo.addQuestion('Do you want to proceed with these experts? yes/no', function(answer, convo) {
                    var keyword = answer.text;
                    if (keyword == 'exit') {
                        started = false;
                        convo.stop();
                    } else if (keyword == "yes") {
                        convo.next();
                        convo.addQuestion('Enter the question. Use shift enter for new line', function(answer, convo) {
                            var question = answer.text;

                            if (answer.text == 'exit') {
                                started = false;
                                convo.stop();
                            } else {


                                var k = 0;
                                async.eachSeries(experts, function(expert, callback) {
            				git.getEmail(expert, function(email) {
					if(email){
                                		bot.reply(message, (k + 1).toString() + ") " + email, function() {
                                    		k++;
                                    		callback();
                                		});
					}
					else{
						bot.reply(message, (k + 1).toString() + ") " + expert, function() {
                                    		k++;
                                    		callback();
                                		});
					}
				});
                                }, function(callback) {
                                    convo.next();
                                    convo.addQuestion('Select people you want to send this message to (eg: 1,2)', function(answer, convo) {
                                        if (answer.text == 'exit') {
                                            convo.stop();
                                        }
                                        var ppl = answer.text;
                                        var number = ppl.split(",");
                                        var flag = false;
                                        for (i = 0; i < number.length; i++) {
                                            console.log(number[i]);
                                            if (parseInt(number[i]) > experts.length) {
                                                bot.reply(message, "Invalid Expert Number");
                                                flag = true;
                                            }
                                        }
                                        if (flag == true) {
                                            bot.reply(message, "Select people you want to send this message to (eg: 1,2)");
                                            convo.repeat();
                                        } else {
                                            for (i = 0; i < number.length; i++) {
                                                //Retrieving emailid from git username
                                                git.getEmail(experts[number[i] - 1], function(email) {
                                                    if (email) {
                                                        //getting slack userid to send message using emailid
                                                        slackUser.getUserName(email, function(userid) {
                                                            if (userid) {
                                                                //Sending a message using slack userid
                                                                slackUser.getName(message.user, function(name) {
                                                                    if (name) {
                                                                        bot.say({
                                                                            text: name + ": " + question,
                                                                            channel: userid
                                                                        })
                                                                    }
                                                                })

                                                            }
                                                        })
                                                    }

                                                });
                                            }
                                            bot.reply(message, "Your question has been sent.");
                                            convo.stop();
                                        }

                                    }, {}, 'default');
                                });


                            }



                        });
                    }
                });
            });

        });





    }

});

controller.hears('clear', ['mention', 'direct_mention', 'direct_message'], function(bot, message) {
    init = 0;
    date = 0;
    topics = 0;
    experts = [];
    topicSearch;

});

function pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}
