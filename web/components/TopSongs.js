import React, {
	PropTypes
}
from 'react';
import {
	playTrack
}
from '../actions/resultActions';
import Result from '../components/Result';
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


class TopSongs extends React.Component {
	constructor(props) {
		super(props);
		// in the constructor we load the data
		let spotifyId = window.location.pathname.split('/')[2];
		props.fetchData(spotifyId, 'recommendations');
	}
	render() {

		let content;
		if (this.props.data.isLoading) {
			content = (<div className='loader'/>)
		}
		else {
			content = (
				
				<ul className='trackRecommendationsInner'> 
					{
						this.props.data.tracks.map((item)=>{
								return (<Result key={item.spotifyId} data={item}/>);
						})
				}
				</ul>
			);
		}
		return (
			<div className='trackRecommendations'>
				<h4> Top Songs</h4>
				{content}
				
			</div>
		);
	}
}

TopSongs.propTypes = {
	fetchData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		data: state.currentArtist.recommendations,
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
)(TopSongs);
