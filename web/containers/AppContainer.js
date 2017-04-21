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
				<SearchBar/>
				<SearchResults/>
			</div>
		);
	}
}

App.propTypes = {
};

export default App;
