let SpotifyWebApi = require('spotify-web-api-node');
let Spotify = new SpotifyWebApi({
	clientId: '27298916f6384257b24fdf87f84f2430',
	clientSecret: '06355cd909bd49ce9c9e36ab9f9757c0',
	redirectUri: 'http://localhost:8081/callback'
});
// music match api key 7d8fcfa09f406557778d8dd0b45bdb6c 

module.exports = {
	Spotify: Spotify
};
