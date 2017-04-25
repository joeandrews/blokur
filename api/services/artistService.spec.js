let expect = require('chai').expect;
let artistService = require('./artistService');

describe('GET /artist/:id', function(done) {

	it('should throw an error if no id is supplied ', function(done) {
		artistService.get()
			.then(done)
			.catch(function(err) {
				expect(err).to.exist;
				done();

			});


	});

	it('should return the cover art, genres and meta data', function(done) {
		artistService.get('0PxzGnCYBpSuaI49OR94cA')
			.then(function(result) {
				expect(result).to.be.an('object')
					.that.has.property('cover_art_url');
				expect(result)
					.to.have.property('artistName')
				expect(result)
					.to.have.property('followers')

				expect(result)
					.to.have.property('genres')
					.that.is.an('array');

				expect(result)
					.to.have.property('spotifyId')
				done();

			})
			.catch(done);

	});

});


describe('GET /artist/:id/recommendations', function(done) {

	it('should throw an error if no query is supplied ', function(done) {

		artistService.getTopTracks()
			.then(done)
			.catch(function(err) {
				expect(err).to.exist;
				done();
			});
	});

	it('should return and array of recomendations', function(done) {

		artistService.getTopTracks('0PxzGnCYBpSuaI49OR94cA')
			.then(function(result) {
				expect(result).to.be.an('array');
				it('should have the required properties on each recommendation', function(done) {

					result.forEach(function(track) {
						expect(track).to.be.an('object');

						expect(track).to.have.property('artistName');
						expect(track).to.have.property('spotifyArtistId');
						expect(track).to.have.property('spotifyId');
						expect(track).to.have.property('songName');
						expect(track).to.have.property('preview_url');

					});
					done();
				})
				done();
			})
			.catch(done);

	});


});

describe('GET /artist/:id/related', function(done) {

	it('should throw an error if no artist is supplied', function(done) {

		artistService.getArtistRelatedArtists()
			.then(done)
			.catch(function(err) {
				expect(err).to.exist;
				done();
			});
	});

	it('should return an array of artists', function(done) {

		artistService.getArtistRelatedArtists('0PxzGnCYBpSuaI49OR94cA')
			.then(function(artists) {
				expect(artists).to.be.an('array');
				done();
			})
			.catch(done);
	});


	it('each artist should have the correct properties', function(done) {

		artistService.getArtistRelatedArtists('0PxzGnCYBpSuaI49OR94cA')
			.then(function(artists) {
				artists.forEach(function(artist) {

					expect(artist).to.have.property('artistName');
					expect(artist).to.have.property('cover_art_url');
					expect(artist).to.have.property('spotifyId');
				});

				done();
			})
			.catch(done);
	});

});

describe('GET /artist/:id/concerts', function() {
	it('should fetch an array of concerts', function(done) {

		artistService.getArtistConcerts('0PxzGnCYBpSuaI49OR94cA')
			.then(function(concerts) {
				expect(concerts).to.be.an('array');
				done();
			})
			.catch(done);
	})
});
