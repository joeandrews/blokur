import React, {
	PropTypes
}
from 'react';

class Result extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<li>
				<img src='http://placehold.it/70x70'/>
				<div> {this.props.data.artistName} - {this.props.data.songName} </div>	
			</li>
		);
	}
}

Result.propTypes = {
	data: PropTypes.object.isRequired
};

export default Result;
