import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import CompletMusicCard from './CompletMusicCard';

export default class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
  };

  clickCheckbox = async (songs, event) => {
    this.setState({
      loading: true,
    });
    await addSong(songs);
    this.setState({
      loading: false,
      checked: event.target.checked,
    });
  };

  render() {
    const { songs, songsFavorites } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        {loading ? <Loading /> : <CompletMusicCard
          songs={ songs }
          songsFavorites={ songsFavorites }
          clickCheckbox={ this.clickCheckbox }
          checked={ checked }
        />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.objectOf(PropTypes.objectOf),
  songsFavorites: PropTypes.arrayOf(PropTypes.arrayOf),
};

MusicCard.defaultProps = {
  songs: [],
  songsFavorites: [],
};
