'use strict';
let musicServices = require('./musicServices');
let Q = require('q');
let request = require('request-promise');

let artistService = {
	get: async function(id) {
		if (!id) {
			return Q.reject('Please pass in an id');
		}

		let deferred = Q.defer();
		let track = await musicServices.Spotify.getArtist(id)
			.then((data) => {
				data = data.body;
				deferred.resolve({
					cover_art_url: data.images[0].url,
					genres: data.genres.splice(0, 3),
					followers: data.followers.total,
					artistName: data.name,
					spotifyId: data.id
				});;

			})
			.catch((err) => {
				return deferred.reject(err);
			});



		return deferred.promise;;

	},
	getTopTracks: async(artistId) => {
		if (!artistId) {
			return Q.reject('Please supply artist id');
		}
		var deferred = Q.defer();
		let recomendations = await musicServices.Spotify.getArtistTopTracks(artistId, 'GB')
			.then((data) => {
				data = data.body;

				let results = data.tracks.map((item) => {
					return {
						cover_art_url: item.album.images[0].url,
						songName: item.name,
						artistName: item.artists[0].name,
						spotifyArtistId: item.artists[0].id,
						preview_url: item.preview_url,
						spotifyId: item.id
					}

				});
				deferred.resolve(results);
			})
			.catch((err) => {
				console.log(err);
				return deferred.reject(err);
			});



		return deferred.promise;;
	},
	getArtistRelatedArtists: async(artistId) => {

		if (!artistId) {
			return Q.reject('Please supply artist id');
		}
		var deferred = Q.defer();
		let artistRecomendations = await musicServices.Spotify.getArtistRelatedArtists(artistId)
			.then((data) => {
				data = data.body;

				let results = data.artists.map((item) => {
					return {
						cover_art_url: item.images[0].url,
						artistName: item.name,
						spotifyId: item.id
					};

				});
				deferred.resolve(results);
			})
			.catch((err) => {
				return deferred.reject(err);
			});



		return deferred.promise;;
	},
	getArtistConcerts: async(artistId) => {

		// there is no api wrapper for bands in town so we simple just use a http request
		// redundant network request, but we have to convert the spotify artistId to a name
		// we could pass this back from the front end but the API is cleaner if everything runs off spotifyId's

		let deferred = Q.defer();
		let url = 'https://rest.bandsintown.com/artists/<artistName>/events?app_id=<appId>';
		let artist = await artistService.get(artistId);
		url = url.replace('<artistName>', encodeURIComponent(artist.artistName));
		url = url.replace('<appId>', encodeURIComponent(Date.now()));

		let options = {
			uri: url,
			headers: {
				'Access-Control-Allow-Origin': 'http://localhost:8081',
				'Content-Type': 'application/json'


			},
			json: true
		};
		request(url)
			.then((items) => {
				deferred.resolve(JSON.parse(items));
			})
			.catch(deferred.reject);

		return deferred.promise;
	}

}

module.exports = artistService;
