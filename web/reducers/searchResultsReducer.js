'use strict';

const initialState = [];

const searchResultsReducer = (state = initialState, action) => {

	switch (action.type) {
		case 'FETCH_SEARCH_RESULTS': {

			return [];
		}
		case 'RECEIVE_SEARCH_RESULTS':{
			return action.data;
		}
		default:
			return state;
	}
};

export default searchResultsReducer;
