'use strict';

let returnExactMatch = function(resultHash, result) {


	// this function matches if the songname and artist passed in are equal to the keyed version 
	// key is in format songname::artist

	// use basic regex to transform the song / artist

	// trim whitespace
	// toLowerCase
	let songName = '';
	let artistName = '';

	// process any descrepancies in the artist /songname format;
	switch (result.type) {
		case 'spotify': {

			break;
		}
		case 'soundcloud':{

			break;
		}
		case 'musixmatch': {

			break;
		}
		default:
			{
				break;
			}
	}

	let testKey = songName.replace(/\s\s+/g, '') + '::' + artist.replace(/\s\s+/g, '');

	if (!!resultHash[testKey]) {
		resultHash[testKey][result.type] = result;
	}
	else {
		resultHash[testKey] = {
			[resultType]: result
		};
	}


}

let SpotifyWebApi = require('spotify-web-api-node');
export default {

	search(ctx, next) {
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
		let params = ctx.params;
		let resultsHash = {};

		// fetch results and group and match
		let spotifyResults = await SpotifyWebApi.searchTracks(params.query).body
			.map(function(result) {
				result.resultType = 'spotify';
				resultMatcher(resultHash, result);
			});

		let soundCloudResults = await SoundcloudAPI.search()

			.map(function(result) {
				result.resultType = 'soundCloud';
				resultMatcher(resultHash, result);
			});

		let musixMatchResults = await MusixMatch.search()
			.map(function(result) {
				result.resultType = 'musixmatch';
				resultMatcher(resultHash, result);
			});

		// we now compare all the results hashes and return valid results
		let validResults = [];
		Object.keys(resultHash)
			.forEach((key)=>{
				let result = resultHash[key];

				if (result.soundcloud && result.musixmatch && result.spotify) {
					// this is a valid song and we have all the data we need
					validResults.push({
						artistName: key.split('::')[1],
						songName: key.split('::')[0],
						soundcloudId: result.soundcloud.id,
						spotifyId: result.spotify.id,
						musixmatchId: result.musixmatch.id,
						cover_art_url: result.spotify.cover_art
					});
				}

			});
			
		ctx.body = validResults
		ctx.status = 200;
		return next();
	}

}
