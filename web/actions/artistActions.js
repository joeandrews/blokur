'use strict';
import API from '../utils/API';
/*
 * action types
 */
export const REQUEST_ARTIST = 'REQUEST_ARTIST_DATA';
export const RECEIVE_ARTIST = 'RECEIVE_ARTIST_DATA';
export const ERROR_RECEIVING_ARTIST = 'ERROR_RECEIVING_ARTIST_DATA';


function requestArtist(spotifyId, dataType) {
	return {
		type: REQUEST_ARTIST,
		dataType,
		data: {
			spotifyId,
			isLoading: false
		}
	}
};

function receiveArtist(spotifyId, dataType, artist) {
	return {
		type: RECEIVE_ARTIST,
		dataType,
		data: {
			spotifyId,
			isLoading: false,
			artist
		}
	}
};

function errorReceivingArtist(spotifyId, dataType, err) {
	return {
		type: ERROR_RECEIVING_ARTIST,
		dataType,
		error: {
			spotifyId,
			isLoading: false,
				err
		}
	}
}

export function fetchArtist(spotifyId, dataType) {

	return (dispatch, getState) => {
		dispatch(requestArtist(spotifyId, dataType));
		return API.xhrRequest({
				method: 'get',
				path: '/artist/' + encodeURIComponent(spotifyId) + '/' + dataType,
			})
			.then(response => response.json())
			.then(json => dispatch(receiveArtist(spotifyId, dataType, json)))
			.catch(err => dispatch(errorReceivingArtist(spotifyId, dataType, err)));
	};
}
