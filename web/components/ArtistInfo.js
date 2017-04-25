import React, {
	PropTypes
}
from 'react';

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


class ArtistInfo extends React.Component {
	constructor(props) {
		super(props);
		// in the constructor we load the data
		let spotifyId = window.location.pathname.split('/')[2];
		props.fetchArtist(spotifyId, 'info');
	}

	render() {

		let content;
		if (this.props.data.isLoading) {
			content = (<div className='loader'/>)
		}
		else {
			content = (
				<div className='artistInfoInner'>
					<div className='artistImage'> 

					<img src={this.props.data.cover_art_url}/>
				</div>
				<h3> {this.props.data.artistName}  </h3>	
				<div className='tags'>
					{this.props.data.genres.map((t)=> {
						return (<div className='tag' key={t}> {t}</div>);
					})}
				</div>
				<p className='followers'> Followers: {this.props.data.followers}</p>
			</div>
			);
		}
		return (
			<div className='artistInfo'>
				{content}
				
			</div>
		);
	}
}

ArtistInfo.propTypes = {
	fetchArtist: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		currentlyPlayingSong: state.soundManager.currentTrackId,
		data: state.currentArtist.info,
	};
};

function mapDispatchToProps(dispatch) {
	return {
		fetchArtist: bindActionCreators(fetchArtist,dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArtistInfo);
