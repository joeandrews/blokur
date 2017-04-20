'use strict'
const initialState = {
	query: '',
	results: []
};
const searchReducer = (state=initialState, action) => {

  switch (action.type) {
    case 'SONG_SEARCH':
			return {
        query: action.query
		};
		default:
      return state;
  }
};

export default searchReducer;
