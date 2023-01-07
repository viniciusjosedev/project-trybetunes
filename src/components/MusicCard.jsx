import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
  };

  async componentDidMount() {
    const { trackInfo } = this.props;
    this.setState({
      loading: true,
    });
    const getSongs = await getFavoriteSongs();
    // console.log(getSongs);
    if (getSongs.some((elemento) => elemento.trackId === trackInfo.trackId)) {
      this.setState({
        checked: true,
      });
    }
    this.setState({
      loading: false,
    });
  }

  att = ({ target }) => {
    // console.log(target.checked);
    // console.log(name);
    const { forceAtt } = this.props;
    this.setState({
      loading: true,
      checked: target.checked,
    }, async () => {
      if (target.checked) {
        await addSong(JSON.parse(target.name));
      } else {
        await removeSong(JSON.parse(target.name));
        if (forceAtt) forceAtt();
      } this.setState({
        loading: false,
      });
    });
    // console.log(saved);
  };

  render() {
    const { trackInfo } = this.props;
    const { loading, checked } = this.state;
    // console.log(trackInfo.previewUrl);
    return (
      <div>
        <h3>{!loading ? trackInfo.trackName : 'Carregando...'}</h3>
        <audio data-testid="audio-component" src={ trackInfo.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="checkbox">
          Favorita
          <input
            name={ JSON.stringify(trackInfo) }
            data-testid={ `checkbox-music-${trackInfo.trackId}` }
            type="checkbox"
            checked={ checked }
            onChange={ this.att }
            id="checkbox"
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackInfo: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  forceAtt: PropTypes.func,
};

MusicCard.defaultProps = {
  forceAtt: undefined,
};
