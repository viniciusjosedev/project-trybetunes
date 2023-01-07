import { Component } from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    albumInfo: undefined,
    trackInfo: undefined,
  };

  async componentDidMount() {
    const { match: { params } } = this.props;
    const albumInfo = await getMusics(params.id);
    console.log(albumInfo);
    this.setState({
      albumInfo: albumInfo[0],
      trackInfo: albumInfo.slice(1, albumInfo.length),
    });
  }

  render() {
    const { albumInfo, trackInfo } = this.state;
    // console.log(trackInfo);
    return (
      <main data-testid="page-album">
        <h1>Album</h1>
        <h1 data-testid="artist-name">{albumInfo ? albumInfo.artistName : ''}</h1>
        <h1 data-testid="album-name">{albumInfo ? albumInfo.collectionName : ''}</h1>
        {trackInfo ? trackInfo.map((elemento) => (
          <MusicCard key={ elemento.collectionId } trackInfo={ elemento } />
        )) : ''}
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
