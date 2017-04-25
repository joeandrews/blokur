export const PLAY_TRACK = 'PLAY_TRACK';

export function playTrack(spotifyId, preview_url) {
	return {
		type: PLAY_TRACK,
		spotifyId,
		preview_url
	};

}
