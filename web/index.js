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
import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import defaultTheme from './theme-default';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
injectTapEventPlugin();
let AppRouter = React.createFactory(Router);
import {
	Provider
}
from 'react-redux';
import {
	createStore
}
from 'redux';
import BlokurApp from './reducers/index';
let store = createStore(PeanutAdmin);
render((

	<MuiThemeProvider
		muiTheme={getMuiTheme()}
	>
		<Provider store={store}>
			{
				AppRouter({
					history: browserHistory,
					routes: routes,
				})
			}
		</Provider>
	</MuiThemeProvider>


), document.getElementById('app'));
