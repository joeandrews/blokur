'use strict';

const initialState = {
	query: '',
	isTyping: false,
	isFetching: false
};

const searchBarReducer = (state=initialState, action) => {

  switch (action.type) {
    case 'HANDLE_SEARCH':
			return {
				query: action.query,
				isTyping: true,
				isFetching: false
			};
			case 'FETCH_SEARCH_RESULTS':
				return {
					query: action.query,
					isTyping: false,
					isFetching: true
		};
		default:
      return state;
  }
};

export default searchBarReducer;


