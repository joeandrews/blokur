let expect = require('chai').expect;
let searchService = require('./searchService');

describe('GET /search?query=daft', function(done) {

	it('should return an array of search results ', function(done) {

		searchService.search({
				query: 'Daft punk'
			})
			.then(function(results) {
				expect(results).to.be.an('array');
				done();
			})
			.catch(done);


	});



	it('each result should return the required fields', function(done) {

		searchService.search({
				query: 'Daft punk'
			})
			.then(function(results) {
				results.forEach((r) => {
					expect(r).to.have.property('preview_url');
					expect(r).to.have.property('songName');
					expect(r).to.have.property('artistName');
					expect(r).to.have.property('spotifyId');
					expect(r).to.have.property('spotifyArtistId');
				});
				done();
			})
			.catch(done);
	});


	it('should throw an error if no query is supplied ', function(done) {

		searchService.search({})
			.then(done, function(err) {
				expect(err).to.exist;
				done();
			});
	});

});
