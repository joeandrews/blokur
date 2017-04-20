'use strict';
import {
	combineReducers
}
from 'redux';
import searchReducer from './searchReducer';

const BlokurApp = combineReducers({
	searchReducer: searchReducer
});

export default BlokurApp;
