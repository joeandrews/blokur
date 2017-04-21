import React, {
	PropTypes
}
from 'react';
import {
	handleSearch	
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

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	throttleSearch(event) {

		const target = event.target;
		const value = target.value;
		const name = target.name;


		// throtle the search by 300 ms
		let searchTimeout = setTimeout(() => {
			// if we get in here we fire the action
			this.props.search(this.state.query);
		}, 300);

		// always update the state, but only search if we don't clear timeout
		if (this.state.searchTimeout) {
			clearTimeout(this.state.searchTimeout);
		}

		this.setState({
			[name]: value,
			searchTimeout: searchTimeout
		});

	}
	render() {
		return (
			<div className="searchBox">

				<h1> Type in the search box to find a song </h1>
				<input 
					placeholder={"enter, song, artist or album"}
					onChange={(e)=>{
							this.throttleSearch(e);	
					}}
					name={"query"}
				/> 
			</div>
		);
	}
}

SearchBar.propTypes = {
	search: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return state.searchBar;
}

function mapDispatchToProps(dispatch) {
	return {
		search: bindActionCreators(handleSearch, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchBar);
