import React, {
	PropTypes
}
from 'react';
import {
	songSearch
}
from '../actions/searchActions';
import Result from '../components/Result';
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
					<Result key={result.spotifyId} data={result}/>
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
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchResults);
