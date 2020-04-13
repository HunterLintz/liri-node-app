# LIRI Bot
### A node app developed by Hunter Lintz

## LIRI can do the following things
* Search a band for upcoming concerts.
* Search a song for info about it.
* Search a Movie for info about it.
* Read from the random.txt file to search as well.

## Some of the Technologies Used
* Node
* Axios
* Moment
* Various API's

## How to Run LIRI
* Once downloaded you need to have a create a .env file and add this replacing the values with your spotify id and spotify secret both of which you can get here: https://developer.spotify.com/my-applications/#!/
![env image](/images/env.PNG)
* Open gitbash and run the command 'node ./liri.js (YOUR SEARCH TYPE) (YOUR SEARCH QUERY)'
* Search types can be any of the following
	* "concert-this"
	* "spotify-this-song"
	* "movie-this"
	* "do-what-it-says"
* Your search query can be any band, song, or movie depending on which search type you use.

## Output Examples

### "concert-this"
![concert-this](/images/concert.PNG)

### "spotify-this-song"
![spotify-this-song](/images/spotify.PNG)

### "movie-this"
![movie-this](/images/movie.PNG)

### "do-what-it-says"
![do-what-it-says](/images/random.PNG)
