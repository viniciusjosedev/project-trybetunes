import { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    loading: true,
    songs: [],
    songsFavorites: [],
  };

  async componentDidMount() {
    const listaFavoritas = [];
    const favoritas = await getFavoriteSongs();
    // console.log(favoritas);
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    // console.log(musics);
    musics.slice(1, musics.length).forEach((elemento) => {
      const filtro = favoritas.filter((e) => e.trackId === elemento.trackId);
      if (filtro.length > 0) { listaFavoritas.push(filtro); }
    });
    getMusics(id).then((elemento) => {
      this.setState({
        songs: elemento,
        loading: false,
        songsFavorites: listaFavoritas,
      });
    });
  }

  render() {
    const { songs, loading, songsFavorites } = this.state;
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
          {loading ? '' : songsNovos.map((elemento) => (
            <MusicCard
              key={ elemento.trackId }
              songsFavorites={ songsFavorites }
              songs={ elemento }
            />
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
