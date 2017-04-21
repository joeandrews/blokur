import React, {
	PropTypes
}
from 'react';
import {
	songSearch
}
from '../actions/searchActions';

import {
	connect
}
from 'react-redux';



import {
	bindActionCreators
}
from 'redux';
class SearchResults extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<ul>
				{this.props.searchResults.map((result)=>(
					<li key={result.spotifyId}>{result.artistName} - {result.songName}</li>
				))}
			</ul>
		);
	}
}

SearchResults.propTypes = {
	searchResults: PropTypes.array.isRequired
};

function mapStateToProps(state) {
	return {
		searchResults: state.searchResults
	};
};

function mapDispatchToProps(dispatch) {
	return {
		// songSearch: bindActionCreators(songSearch, dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchResults);
