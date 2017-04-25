'use strict';
let Q = require('q');
let musicServices = require('./musicServices');

let searchService = {
	search: async (params) => {


		if (!params.query) {
			return Q.reject('Please supply a query');
		}

		let resultsHash = {};
		let promises = [];
		let deferred = Q.defer();

		// fetch results and group and match
		let spotifySearchResults = await musicServices.Spotify.searchTracks(params.query)
			.then(function(data) {
				deferred.resolve(data.body.tracks.items
					.map(function(result) {
						return {
							artistName: result.artists[0].name,
							songName: result.name,
							spotifyId: result.id,
							spotifyArtistId: result.artists[0].id,
							preview_url: result.preview_url

						};
					}));
			})
			.catch((err) => {
				deffered.reject(err);
			});

		return deferred.promise;
	}

};

module.exports = searchService;
