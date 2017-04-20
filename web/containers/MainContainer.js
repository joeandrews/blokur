import React, {
	PropTypes
}
from 'react';
import SearchBox from '../components/SearchBox';
import SongResults from '../components/SongResults';
import Api from '../utils/API.js';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1> Type in the search box to begin </h1>
				<SearchBox/>
				<SongResults/>
			</div>
		)
	}
}

App.propTypes = {
	children: PropTypes.element,
	width: PropTypes.number,
};

module.exports = App
