import { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

export default class Album extends Component {
  state = {
    loading: true,
    songs: [],
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((elemento) => {
      this.setState({
        songs: elemento,
        loading: false,
      });
    });
  }

  render() {
    const { songs, loading } = this.state;
    const songsNovos = songs.slice(1, songs.length);
    return (
      <div data-testid="page-album">
        <h2 data-testid="artist-name">
          {songs.length > 0 ? `${songs[0].artistName}` : 'Carregando...'}
        </h2>
        <h2 data-testid="album-name">
          {songs.length > 0 ? `${songs[0].collectionName}` : ''}
        </h2>
        <div>
          {loading ? null : songsNovos.map((elemento) => (
            <MusicCard key={ elemento.trackId } songs={ elemento } />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Album.defaultProps = {
  match: {},
};
