'use strict';

let returnExactMatch = function(resultsHash, result) {


	// this function matches if the songname and artist passed in are equal to the keyed version 
	// key is in format songname::artist

	// use basic regex to transform the song / artist

	// trim whitespace
	// toLowerCase
	let songName = '';
	let artistName = '';

	// process any descrepancies in the artist /songname format;
	switch (result.resultType) {
		case 'spotify':
			{
				artistName = result.artists ? result.artists[0].name : '';
				songName = result.name;
				break;
			}
		case 'soundcloud':
			{

				break;
			}
		case 'musixmatch':
			{

				break;
			}
		default:
			{
				break;
			}
	}

	let testKey = songName.replace(/\s\s+/g, '') + '::' + artistName.replace(/\s\s+/g, '');
	if (!!resultsHash[testKey]) {
		resultsHash[testKey][result.resultType] = result;
	} else {
		resultsHash[testKey] = {};
		resultsHash[testKey][result.resultType] = result;
	}


}

let SpotifyWebApi = require('spotify-web-api-node');
let Spotify = new SpotifyWebApi({
	clientId: '27298916f6384257b24fdf87f84f2430',
	clientSecret: '06355cd909bd49ce9c9e36ab9f9757c0',
	redirectUri: 'http://www.example.com/callback'
});

let searchService = {
	search: async(ctx, next) => {

		/*
			this function combines search results from spotify, soundcloud and musix match so we have all the data we require for the frontend ui

			soundcloud is used for music playback
			spotify is used for audio analysis
			music match provides lyrics


			this function returns a 200 request and an array of search result models

			[
				{
					soundcloudId: STRING,
					spotifyId: STRING,
					cover_art_url: STRING,
					artist: STRING,
					name: STRING,
					duration: INT,
					musixMatchId: STRING
				}, 
				...
			]

*/
		let params = ctx.query;
		let resultsHash = {};
		let promises = [];

		// fetch results and group and match
		let spotifySearch = await Spotify.searchTracks(params.query)
			.then(function(data) {
				data.body.tracks.items
					.map(function(result) {
						result.resultType = 'spotify';
						returnExactMatch(resultsHash, result);
					});
			})
			.catch((err) => {
				console.log(err);
			});

		promises.push(spotifySearch);


		// let soundCloudResults = await SoundcloudAPI.search()

		// .map(function(result) {
		// result.resultType = 'soundCloud';
		// resultMatcher(resultHash, result);
		// });

		// let musixMatchResults = await MusixMatch.search()
		// .map(function(result) {
		// result.resultType = 'musixmatch';
		// resultMatcher(resultHash, result);
		// });

		// we now compare all the results hashes and return valid results
		Promise.all(promises)
			.then(function() {

				let validResults = [];
				Object.keys(resultsHash)
					.forEach((key) => {
						let result = resultsHash[key];
						if (result.spotify) {
							// this is a valid song and we have all the data we need
							validResults.push({
								artistName: key.split('::')[1],
								songName: key.split('::')[0],
								// soundcloudId: result.soundcloud.id,
								spotifyId: result.spotify.id,
								// musixmatchId: result.musixmatch.id,
							});
						}

					});

				ctx.body = validResults;
				ctx.status = 200;

				// return next();
			});
	}

};

module.exports = searchService;
