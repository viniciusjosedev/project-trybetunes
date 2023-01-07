import { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { trackInfo } = this.props;
    // console.log(trackInfo.previewUrl);
    return (
      <>
        <h3>{trackInfo.trackName}</h3>
        <audio data-testid="audio-component" src={ trackInfo.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </>
    );
  }
}

MusicCard.propTypes = {
  trackInfo: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};
