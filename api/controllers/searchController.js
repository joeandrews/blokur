'use strict';
let searchService = require('./../services/searchService.js');

module.exports = {

	search: async(ctx, next) => {

		let params = ctx.query;
		try {

			let results = await searchService.search(params);

			ctx.body = results;
			ctx.status = 200;
		} catch (err) {

			ctx.body = new Error(err);
			ctx.status = 500;
		}


	}
}
