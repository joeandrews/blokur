import React from 'react';
import {
	render
}
from 'react-dom';
import {
	browserHistory, Router
}
from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './config/routes';
// require('./favicon.ico');
injectTapEventPlugin();
let AppRouter = React.createFactory(Router);
import {
	Provider
}
from 'react-redux';
import {
	createStore, applyMiddleware
}
from 'redux';
import thunkMiddleware from 'redux-thunk';
import BlokurApp from './reducers/index';
let store = createStore(BlokurApp, {}, applyMiddleware(
	thunkMiddleware
));
render((

	// <MuiThemeProvider
	// muiTheme={getMuiTheme()}
	// >
	<Provider store={store}>
			{
				AppRouter({
					history: browserHistory,
					routes: routes,
				})
			}
		</Provider>
	// </MuiThemeProvider>


), document.getElementById('app'));
