var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});
var elastic = require("./elastic.js");

elastic.save(client, "test1", "test1", () => {
    console.log("Done");
})

elastic.search(client,"test1",(resp) => {
    console.log("Done Searching");
    console.log(resp)
})