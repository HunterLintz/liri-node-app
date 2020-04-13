require("dotenv").config();

var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require("fs");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var search = process.argv[3];
var prettySearch

//makes a version of search without pluses so that some apis can be called
if (search != null){
	prettySearch = search.split("+").join(" ");
};
//send you to correct function based off input
switch (action) {
	case "concert-this":
		concertThis();
		break;
	case "spotify-this-song":
		spotifyThisSong();
		break;
	case "movie-this":
		movieThis();
		break;
	case "do-what-it-says":
		doWhatItSays();
		break;
}
//this give and ouput of about up to 5 upcoming events for a certain artist you look up
function concertThis(){
	var concertQueryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp"
	axios.get(concertQueryUrl).then(
		function(response){
			console.log("\n\n");
			if (response.data.length < 5){
				console.log("Here is some info for the next " + response.data.length + " events for " + prettySearch + "!");
				for( var i = 0; i < response.data.length;i++){
					console.log("-----------------------------");
					console.log("Event " + [i + 1] + ":");
					console.log("Venue: " + response.data[i].venue.name);
					console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
					console.log("Date of Event: " + moment(response.data[i].datetime).format("MMMM Do, YYYY"));
				};
			}else{
				console.log("Here is some info for the next 5 events for " + prettySearch + "!");
				for(var i = 0; i < 5; i++){
					console.log("-----------------------------");
					console.log("Event " + [i + 1] + ":");
					console.log("Venue: " + response.data[i].venue.name);
					console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
					console.log("Date of Event: " + moment(response.data[i].datetime).format("MMMM Do, YYYY"));
				};
			};
			console.log("\n\n");
		});
};
//this gives and output of info about the song you look up
function spotifyThisSong(){
	console.log("\n\n\n\n");
	if (search == null){
		console.log("You didnt give me a song so I looked up The Sign by Ace of Base for you!\n");
		prettySearch = "The Sign";
	};
	spotify.search({type:"track",query: '' + prettySearch + '' }, function(err, data){
		if(err){
			return console.log("Error occurred: " + err);
		};
	console.log("Info about the song " + data.tracks.items[0].name + ": ");
	console.log("-------------------");
	console.log("Artist(s):");
	for(var i = 0; i < data.tracks.items[0].artists.length; i++){
		console.log(data.tracks.items[0].artists[i].name);
	};
	console.log("-------------------");
	console.log("Song's Name:");
	console.log(data.tracks.items[0].name);
	console.log("-------------------");
	console.log("Link to Song's Preview on Spotify:");
	if(data.tracks.items[0].preview_url == null){
		console.log("Currently no preview url... Sorry!");
	}else{
		console.log(data.tracks.items[0].preview_url);
	};
	console.log("-------------------");
	console.log("Album Name: ");
	console.log(data.tracks.items[0].album.name);
	console.log("\n");
	});
};
//this give you info about a movie you look up
function movieThis(){
	console.log("\n\n\n\n");
	if (search == null){
		console.log("Since you gave no movie name I went ahead and searched the move Mr. Nobody for you! Check it out!\n");
		search = "Mr.+Nobody";
	}
	var movieQueryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + search;
	axios.get(movieQueryUrl).then(
		function(response){
			console.log("Info about the movie " + response.data.Title);
			console.log("--------------------");
			console.log("Title: " + response.data.Title);
			console.log("Year Released: " + response.data.Year);
			console.log("IMDB Rating: " + response.data.Ratings[0].Value);
			console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
			console.log("Country(ies) Produced: " + response.data.Country);
			console.log("Plot: " + response.data.Plot);
			console.log("Actor(s): " + response.data.Actors);
			console.log("\n\n\n\n\n");
		});
};
//this reads what is in the random.txt file and preforms a function based off what is in there
function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
		  return console.log(err);
		}
		dataArray = data.split(",");
		var otherAction = dataArray[0];
		search = dataArray[1];
		prettySearch = search.split("+").join(" ");

		switch (otherAction) {
			case "concert-this":
				concertThis();
				break;
			case "spotify-this-song":
				spotifyThisSong();
				break;
			case "movie-this":
				movieThis();
				break;
		};
	});
};