'use strict';
let artistService = require('./../services/artistService.js');

module.exports = {

	get: async(ctx, next) => {

		let params = ctx.params;
		try {

			let track = await artistService.get(params.id);
			ctx.body = track;
			ctx.status = 200;
		} catch (error) {
			console.log(error);
			ctx.body = error;
			ctx.status = 500;
		}


	},
	recommendations: async(ctx, next) => {

		let params = ctx.params;
		try {

			let tracks = await artistService.getTopTracks(params.id);

			ctx.body = {tracks: tracks};
			ctx.status = 200;
		} catch (error) {
			ctx.body = error;
			ctx.status = 500;
		}

	},
	related: async(ctx, next) => {

		let params = ctx.params;
		try {

			let artists = await artistService.getArtistRelatedArtists(params.id);

			ctx.body = {artists: artists};
			ctx.status = 200;
		} catch (error) {
			console.log(error);
			ctx.body = error;
			ctx.status = 500;
		}

	}

	
};
