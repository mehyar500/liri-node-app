//all variables
//import api keys
var keys = require("./keys.js");
// Include the request npm package
var request = require("request");
//include twitter pckage
var twitter = require("twitter");
//include spotify package
var spotify = require("node-spotify-api");

var twitterClient = new twitter(keys.twitterKeys);


// hold the array of arguments 
var argument = process.argv;
//variable to hold the inquery argument 
var inquery = argument[2];


if (inquery === "my-tweets") {
	var stream = twitterClient.stream('statuses/filter', {track: 'javascript'});

	stream.on('data', function(event) {
	  console.log(event && event.text);
	});
 
	stream.on('error', function(error) {
	  throw error;
	});
}