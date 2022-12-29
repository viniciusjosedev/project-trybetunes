import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
// import Loading from './Loading';
import CompletMusicCard from './CompletMusicCard';

export default class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
    songsFavorites2: undefined,
  };

  clickCheckbox = async (songs, event, checked) => {
    this.setState({
      loading: true,
    });

    if (checked === true) {
      // console.log(componentFavorite);
      removeSong(songs).then(() => {
        const { componentFavorite, funcAtt } = this.props;
        if (componentFavorite) {
          funcAtt();
        }
        const { songsFavorites } = this.props;
        // console.log('removeSong');
        this.setState({
          loading: false,
          checked: event.target.checked,
          songsFavorites2: songsFavorites.filter((e) => e[0].trackId !== songs.trackId),
        });
      });
    } else {
      addSong(songs).then(() => {
        // console.log('addSong');
        const checado = event.target.checked;
        this.setState({
          loading: false,
          checked: checado,
        });
      });
    }
  };

  render() {
    const { songs, songsFavorites } = this.props;
    // console.log(songsFavorites[0]);
    const { loading, checked, songsFavorites2 } = this.state;
    return (
      <div>
        {loading ? <h1>Carregando...</h1> : <CompletMusicCard
          songs={ songs }
          songsFavorites={ [songsFavorites, songsFavorites2] }
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
  componentFavorite: PropTypes.bool,
  funcAtt: PropTypes.func,
};

MusicCard.defaultProps = {
  songs: [],
  songsFavorites: [],
  componentFavorite: false,
  funcAtt: () => {},
};
