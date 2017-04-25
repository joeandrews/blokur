import React, {
	PropTypes
}
from 'react';
import ArtistInfo from './../components/ArtistInfo';    
import TopSongs from './../components/TopSongs';    
import RelatedArtists from './../components/RelatedArtists';    

class ArtistPage extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return (
			<div className='artistInfoPage'>
				<ArtistInfo/>
				<TopSongs/>
				<RelatedArtists/>
			</div>
		);
	}
}


export default ArtistPage;
