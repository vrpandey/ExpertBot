function save(client, title, user, callback) {
    client.update({
        index: 'expertbot',
        type: 'doc',
        id: user,
        body: {
            script: 'ctx._source.doc1 += ' + "\" " + title + "\"",
            upsert: {
                doc1: title
            }
        },
        retry_on_conflict: 6
    }, function(error, response) {
        // ...
    })
    callback();

}

function search(client, title, callback) {
    client.search({
        index: 'expertbot',
        type: 'doc',
        body: {
            query: {
                fuzzy: { doc1: title }
            }
        }
    }, function(error, response) {
        //If mock is used, un-comment the next line (and vice-versa if not)
        // response = JSON.parse(response);
        //Mock returns plain text and not JSON object
	console.log(response)
        if (response.hits.hits.length == 0) {
            callback("sorry no results found")
        } else {
            var answer = []
            for (var i = 0; i < response.hits.hits.length; i++) {
                answer.push(response.hits.hits[i]._id)
            }
            callback(answer)
        }
    })

}

function listExperts(client, callback) {
    client.search({
        index: 'expertbot',
        type: 'doc',
        body: {
            query: {
                match_all: {}
            }
        }
    }, function(error, response) {
        //If mock is used, un-comment the next line (and vice-versa if not)
        // response = JSON.parse(response);
        //Mock returns plain text and not JSON object
        if (response.hits.hits.length == 0) {
            callback("sorry no results found")
        } else {
            var answer = []
            for (var i = 0; i < response.hits.hits.length; i++) {
                answer.push(response.hits.hits[i]._id)
            }
            callback(answer)
        }
    })
}


exports.search = search;
exports.save = save;
exports.listExperts = listExperts;
