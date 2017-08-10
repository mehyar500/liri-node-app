//all variables
// hold the array of arguments 
var argument = process.argv;
//variable to hold the inquery argument 
var inquery = argument[2];
//variable to hold the secondary argument
var inquery2 = argument[3];
//import api keys
var keys = require("./keys.js");
// Include the request npm package
var request = require("request");


//the twitter bot
if (inquery === "my-tweets") {
	//include twitter pckage
	var twitter = require("twitter");
	// new twitter object cloned from the package "twitter"
	//and stored in the variable with the following config inside of it
	var twit = new twitter(keys.twitterKeys);
	// variable to hold the parameter 
	var params = {screen_name: 'mehyarswelim'};
	//get data from twitter using twit and the parameter
	twit.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
		// loop through the array of results coming
		//and print the data of the property name "text"
		for (var i = 0; i < tweets.length; i++){
			console.log(tweets[i].text);
		}
		// console.log(tweets);
		};
	});
}

//the Spotify bot
if (inquery === "spotify-this-song") {
	//include spotify package
	var spotify = require("node-spotify-api");

}
