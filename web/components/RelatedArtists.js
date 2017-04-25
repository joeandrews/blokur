import React, {
	PropTypes
}
from 'react';
import RelatedArtist from './RelatedArtist';
import {
	fetchArtist
}
from '../actions/artistActions';
import {
	connect
}
from 'react-redux';

import {
	bindActionCreators
}
from 'redux';


class RelatedArtists extends React.Component {
	constructor(props) {
		super(props);
		// in the constructor we load the data
		let spotifyId = window.location.pathname.split('/')[2];
		props.fetchData(spotifyId, 'related');
	}
	render() {

		let content;
		if (this.props.data.isLoading) {
			content = (<div className='loader'/>)
		}
		else {
			content = (
				
				<ul className='relatedArtistsInner'> 
					{
						this.props.data.artists.map((item)=>{
								return (<RelatedArtist key={item.spotifyId} data={item}/>);
						})
				}
				</ul>
			);
		}
		return (
			<div className='relatedArtists'>
				<h4> Related Artists</h4>
				{content}
				
			</div>
		);
	}
}

RelatedArtists.propTypes = {
	fetchData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		data: state.currentArtist.related,
	};
};

function mapDispatchToProps(dispatch) {
	return {
		fetchData: bindActionCreators(fetchArtist,dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RelatedArtists);
