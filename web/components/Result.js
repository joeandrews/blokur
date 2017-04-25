import React, {
	PropTypes
}
from 'react';

import {
	playTrack
}
from '../actions/resultActions';
import {
	connect
}
from 'react-redux';
import {
	browserHistory
}
from 'react-router';
import {
	bindActionCreators
}
from 'redux';
class Result extends React.Component {
	constructor(props) {
		super(props);

	}
	handlePlay(e) {
		// dispatch action
		e.preventDefault();
		e.stopPropagation();
		this.props.playTrack(this.props.data.spotifyId, this.props.data.preview_url);
	}
	isPlaying() {
		if (this.props.isCurrentlyPlaying && this.props.currentlyPlayingSong === this.props.data.spotifyId) {
			return ' pause';
		}
		return '';
		
	}
	render() {
		return (
			<li onClick={()=>{
				browserHistory.push('/a/' + this.props.data.spotifyArtistId);
			}}>
				<div 
					className={'controlIcon' + this.isPlaying()}
					onClick={(e)=>{this.handlePlay(e);}}
				/>
				<div className='artistText'> {this.props.data.artistName} - {this.props.data.songName} </div>	
			</li>
		);
	}
}

Result.propTypes = {
	data: PropTypes.object.isRequired,
	currentlyPlayingSong: PropTypes.string,
	isCurrentlyPlaying: PropTypes.bool,
	playTrack: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		currentlyPlayingSong: state.soundManager.currentTrackId,
		isCurrentlyPlaying: state.soundManager.isCurrentlyPlaying
	};
};

function mapDispatchToProps(dispatch) {
	return {
		playTrack: bindActionCreators(playTrack, dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Result);
