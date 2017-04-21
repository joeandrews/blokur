import React, {
	PropTypes
}
from 'react';
import SearchBar from './../components/SearchBar';
import SearchResults from './../components/SearchResults';
import Api from './../utils/API.js';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1> Type in the search box to find a song </h1>
				<SearchBar/>
				<SearchResults/>
			</div>
		);
	}
}

App.propTypes = {
};

export default App;
