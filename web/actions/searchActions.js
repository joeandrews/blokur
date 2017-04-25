'use strict';
import API from '../utils/API';
/*
 * action types
 */

export const HANDLE_SEARCH = 'HANDLE_SEARCH';
export const FETCH_SEARCH_RESULTS = 'FETCH_SEARCH_RESULTS';
export const REQUEST_SEARCH_RESULTS = 'REQUEST_SEARCH_RESULTS';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const ERROR_RECEIVING_SEARCH_RESULTS = 'ERROR_RECEIVING_SEARCH_RESULTS';
export const RESET_PENDING_SEARCH = 'RESET_PENDING_SEARCH';


/*
 * action creators
 */
function requestSearchResults(query) {
	return {
		type: REQUEST_SEARCH_RESULTS,
		query
	}
}

function receiveSearchResults(query, json) {
	return {
		type: RECEIVE_SEARCH_RESULTS,
		query,
		data: json,
		isError: false
	}
}

function errorReceivingSearchResults(query, err) {
	return {
		type: ERROR_RECEIVING_SEARCH_RESULTS,
		query,
		data: [],
		isError: true
	}
}

function fetchSearchResults(query) {
	return dispatch => {
		dispatch(requestSearchResults(query));
		return API.xhrRequest({
			method: 'get',
			path: '/search?query=' + encodeURIComponent(query),
		})
			.then(response => response.json())
			.then(json => dispatch(receiveSearchResults(query, json)))
			.catch(err => dispatch(errorReceivingSearchResults(query, err)));
	}
}

function resetPendingSearch(dispatch, state, query) {

	clearTimeout(state.searchTimeout);

	return {
		type: RESET_PENDING_SEARCH,
		query,
		searchTimeout: setTimeout(() => {
			dispatch(fetchSearchResults(query));
		})
	}

}
export function handleSearch(query) {
	return (dispatch, getState) => {
		resetPendingSearch(dispatch, getState(), query);
	}

}
