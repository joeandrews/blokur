'use strict';


export default {
	// component: require('./../containers/AppContainer').default,
	childRoutes: [

		{
			path: '/',
			getComponent: (nextState, cb) => {
				// Share the path
				// Dynamically load the correct component
				return require.ensure([], (require) => {
					cb(null, require('./../containers/AppContainer').default);
				});
			},
		},

		{
			path: '/a/:id',
			getComponent: (nextState, cb) => {
				require.ensure([], (require) => {
					cb(null, require('../containers/ArtistPage').default);

				});
			}
		},

	]
};
