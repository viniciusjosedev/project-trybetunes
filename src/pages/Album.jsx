import { Component } from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import style from '../style/Album.module.css';

export default class Album extends Component {
  state = {
    albumInfo: undefined,
    trackInfo: undefined,
  };

  async componentDidMount() {
    const { match: { params } } = this.props;
    const albumInfo = await getMusics(params.id);
    // console.log(albumInfo);
    this.setState({
      albumInfo: albumInfo[0],
      trackInfo: albumInfo.slice(1, albumInfo.length),
    });
  }

  render() {
    const { albumInfo, trackInfo } = this.state;
    console.log(albumInfo);
    return (
      <main data-testid="page-album" id={ style.main }>
				<div id={ style.divMain }>
					<h3 id={ style.headerAlbum }>Album</h3>
					<img id={ style.img } src={ albumInfo ? albumInfo.artworkUrl100 : null } alt={ albumInfo ? albumInfo.artistId : null } />
					<h3 className={ style.h3Album } data-testid="artist-name">{albumInfo ? albumInfo.artistName : ''}</h3>
					<h3 className={ style.h3Album } data-testid="album-name">{albumInfo ? albumInfo.collectionName : ''}</h3>
					<div id={ style.divTrackInfo }>
						{trackInfo ? trackInfo.map((elemento) => (
							<MusicCard key={ elemento.trackId } trackInfo={ elemento } />
						)) : ''}
					</div>
				</div>
      </main>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

Album.defaultProps = {
  match: { params: { id: '' } },
};
