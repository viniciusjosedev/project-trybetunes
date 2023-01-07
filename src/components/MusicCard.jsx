import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
  };

  att = ({ target }) => {
    // console.log(target.checked);
    // console.log(name);
    this.setState({
      loading: true,
      checked: target.checked,
    }, () => {
      addSong(JSON.parse(target.name)).then(() => {
        this.setState({
          loading: false,
        });
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
        <label htmlFor="checkbox" data-testid={ `checkbox-music-${trackInfo.trackId}` }>
          Favorita
          <input
            name={ JSON.stringify(trackInfo) }
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
};
