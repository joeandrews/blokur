'use strict';

const initialState = {
	isCurrentlyPlaying: false,
	currentTrackId: '',
	audioObject: null,
};

const playTrackReducer = (state = initialState, action={}) => {

	switch (action.type) {
		case 'PLAY_TRACK':
			// handle the playing track case as well
			if (action.spotifyId === state.currentTrackId) {

				if (state.isCurrentlyPlaying && state.audioObject) {
					state.audioObject.pause();
				} else {

					state.audioObject.play();
				}

				return {
					isCurrentlyPlaying: !state.isCurrentlyPlaying,
					currentTrackId: action.spotifyId,
					audioObject: state.audioObject
				};
			}
			// we have to pause the old audio object
			if (state.audioObject) {
				state.audioObject.pause();
			}
			let audioObject = new Audio(action.preview_url);
			audioObject.play();
			return {
				isCurrentlyPlaying: true,
				currentTrackId: action.spotifyId,
				audioObject: audioObject
			};

		default:
			return state;
	}
};

export default playTrackReducer;
