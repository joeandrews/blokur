'use strict';

const initialState = {
	info: {
		isLoading: true
	},

	related: {
		isLoading: true
	},
	recommendations: {
		isLoading: true
	}
};

const artistReducer = (state = initialState, action) => {

	let newState = state;
	switch (action.type) {

		case 'REQUEST_ARTIST_DATA':
			return Object.assign({}, state, {
				[action.dataType]: {
					spotifyId: action.data.spotifyId,
					isLoading: true,
				}
			});
		case 'RECEIVE_ARTIST_DATA':

			let artist = action.data.artist;
			artist.spotifyId = action.data.spotifyId;
			artist.isLoading = false;
			return Object.assign({}, state, {
				[action.dataType]: artist
			});
		default:
			return state;
	}
};

export default artistReducer;
