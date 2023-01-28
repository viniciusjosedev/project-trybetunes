import { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label, Spinner } from 'reactstrap';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import style from '../style/MusicCard.module.css';

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
      <div id={ style.divMusicCard } style={ { backgroundColor: loading ? 'black' : null } }>
        <h3 id={ style.h3 }>{!loading ? trackInfo.trackName : ''}</h3>
				{!loading ? null : <Spinner color="danger" />}
				<div id={ style.div }>
					<audio data-testid="audio-component" src={ trackInfo.previewUrl } controls id={ style.audio }>
						<track kind="captions" />
						O seu navegador não suporta o elemento
						{' '}
						{' '}
						<code>audio</code>
						.
					</audio>
					{/* <label htmlFor="checkbox">
						Favorita
						<input
							name={ JSON.stringify(trackInfo) }
							data-testid={ `checkbox-music-${trackInfo.trackId}` }
							type="checkbox"
							checked={ checked }
							onChange={ this.att }
							id="checkbox"
						/>
					</label> */}
					<FormGroup check >
						<Input type="checkbox" onChange={ this.att } name={ JSON.stringify(trackInfo) } checked={ checked } />
						<Label check>
						Favorita
						</Label>
					</FormGroup>
				</div>
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
