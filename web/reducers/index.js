'use strict';
import {
	combineReducers
}
from 'redux';
import searchBarReducer from './searchBarReducer';
import searchResultsReducer from './searchResultsReducer';

const BlokurApp = combineReducers({
	searchBar: searchBarReducer,
	searchResults:searchResultsReducer
});

export default BlokurApp;
