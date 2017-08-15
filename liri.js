//all variables
// hold the array of arguments 
var argument = process.argv;
//variable to hold the inquery argument 
var inquery = argument[2];
var secondInquery = "";

//import api keys
var keys = require("./keys.js");
// Include the request npm package
var request = require("request");
// Includes the FS package for reading and writing packages
var fs = require("fs");

//include spotify package
var spotify = require("node-spotify-api");
//import spotify keys into a variable
var spotifyKeys = keys.spotifyKeys;
// new spotify object cloned from "node-spotify-api"
//and stored in new variable with the following config keys inside
var spot = new spotify(spotifyKeys);

//include twitter pckage
var twitter = require("twitter");
//import twitter keys into a variable
var twitterKeys = keys.twitterKeys;
// new twitter object cloned from the package "twitter"
//and stored in the variable with the following config inside of it
var twit = new twitter(twitterKeys);
// variable to hold the parameter 
var twitterParams = {screen_name: 'mehyarswelim'};

//Capture all the words in the array of arguments(ignoring the first two Node arguments)
for (var i = 3; i < argument.length; i++) {
  // Build a string with the second Inquery.
  secondInquery = secondInquery + " " + argument[i];
}

//Music inquery function
function musicInquery(secondInquery){
	spot.search({ type: 'track', query: secondInquery })
	.then(function(response) {
		//store the object in the array of items that is in the tracks results
		var firstTrack = response.tracks.items[0];
		var firstTrackArtist = firstTrack.artists;
		// console.log(firstTrack);
		//name of the artist
		console.log("\n\nSong's Artist(s) Names :" + "\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●");//prettifying
		for (var i = 0; i < firstTrackArtist.length; i++){
			console.log(firstTrackArtist[i].name);
		}

		//The song's name
		console.log("\n\nThe Song's Name :" + "\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●");//prettifying
		console.log(firstTrack.name); 
		

		//preview link on spotify
		console.log("\n\nA preview link of the song from Spotify :" + "\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●");//prettifying
		console.log(firstTrack.preview_url); 

		//the album of the song
		console.log("\n\nThe Album of the song :" + "\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●");//prettifying
		console.log(firstTrack.album.name);

	})
	.catch(function(err) {
		console.log(err);
	});
}

//function to inquer about the movie
function movieInquery(secondInquery){
	//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
	if (secondInquery === "") {
		secondInquery = "Mr. Nobody";
		movieInquery(secondInquery);
	} else {
		movieInquery(secondInquery);
	}

	// run the request module on a URL with a JSON
	request("http://www.omdbapi.com/?t=" + secondInquery + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

		// If there were no errors and the response code was 200 (i.e. the request was successful)...
		if (!error && response.statusCode === 200) {

			//parse the data as JSON object
			var movie = JSON.parse(body);

			//The title of The Movie 
			console.log("\n\nMovie Title :" + "\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●");//prettifying
			console.log(movie.Title);

			//The Year the movie came out
			console.log("\n\nYear released :" + "\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●");//prettifying
			console.log(movie.Year);

			//the Movie's Rating
			console.log("\n\nThe movie's rating is :" + "\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●");//prettifying
			console.log(movie.imdbRating);

			//Rotten Tomatos Rating of the movie
			console.log("\n\nRotten Tomatos Rating :" + "\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●");//prettifying
			console.log(movie.Ratings[1].Value);

			//country where the movie was produced
			console.log("\n\nCountry of the movie :" + "\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●");//prettifying
			console.log(movie.Country);

			//language of the movie
			console.log("\n\nMovie language :" + "\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●");//prettifying
			console.log(movie.Language);

			//Plot of the Movie
			console.log("\n\nMovie plot :" + "\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●");//prettifying
			console.log(movie.Plot);

			//actors in the Movie
			console.log("\n\nMovie Actors :" + "\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●");//prettifying
			console.log(movie.Actors);
		}
	});
}

//Twitter bot function
function tweets(twitterParams){
//get data from twitter using twit and the parameter
twit.get('statuses/user_timeline', twitterParams, function(error, tweets, response) {
	if (!error) {
	// loop through the array of results coming
	//and print the data of the property name "text"
	for (var i = 0; i < tweets.length; i++){
		console.log("●▬▬▬▬๑۩۩๑▬▬▬▬▬●\n" + tweets[i].text + "\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●\n");
	}
	// console.log(tweets);
	};
});
}

//the Do-what-it-says bot
function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(err, data){
		if (err) {
			return console.log(err);
		}
  		// Break the string down by comma separation and store the contents into the output array.
		var output = data.split(",");
		//assign the new array elements to the inquery variables
		inquery = output[0];
		secondInquery = output[1];

		//switch statment 
		switch(inquery) {
		case "my-tweets":
			tweets(twitterParams);
			break;

		case "spotify-this-song":
			musicInquery(secondInquery);
			break;

		case "movie-this":
			movieInquery(secondInquery);
			break;
		}
	});
}


//switch statment for the inqueries
switch(inquery) {
	case "my-tweets":
		tweets(twitterParams);
		break;

	case "spotify-this-song":
		musicInquery(secondInquery);
		break;

	case "movie-this":
		movieInquery(secondInquery);
		break;

	case "do-what-it-says":
		doWhatItSays();
		break;
}