'use strict';
import {
	combineReducers
}
from 'redux';
import searchBarReducer from './searchBarReducer';
import searchResultsReducer from './searchResultsReducer';
import playTrackReducer from './playTrackReducer';
import artistInfoReducer from './artistInfoReducer';

const BlokurApp = combineReducers({
	searchBar: searchBarReducer,
	searchResults:searchResultsReducer,
	soundManager: playTrackReducer,
	currentArtist: artistInfoReducer,
});

export default BlokurApp;
