import React, {
	PropTypes
}
from 'react';

import {
	browserHistory
}
from 'react-router';

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
class RelatedArtist extends React.Component {
	constructor(props) {
		super(props);

	}
	render() {
		return (
			<li className='relatedArtist' onClick={()=>{
				browserHistory.push('/a/' + this.props.data.spotifyId, true);
				this.props.fetchData(this.props.data.spotifyId,'info');
				this.props.fetchData(this.props.data.spotifyId,'related');
				this.props.fetchData(this.props.data.spotifyId,'recommendations');
				
			}}>
			<img src={this.props.data.cover_art_url}/>
				<div className='artistText'> {this.props.data.artistName} </div>	
			</li>
		);
	}
}

RelatedArtist.propTypes = {
	data: PropTypes.object.isRequired,
	fetchData: PropTypes.func.isRequired
};

function mapStateToProps() {
	return {
	};
};

function mapDispatchToProps(dispatch) {
	return {
		fetchData: bindActionCreators(fetchArtist, dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RelatedArtist);
