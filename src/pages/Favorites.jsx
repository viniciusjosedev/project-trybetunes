import { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

export default class Favorites extends Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    await this.funcAtt();
  }

  funcAtt = async () => {
    // console.log('passou aqui');
    this.setState({
      loading: true,
    });
    const favorite = await getFavoriteSongs();
    // console.log(favorite);
    this.setState({
      loading: false,
      favorite,
    });
  };

  render() {
    const { loading, favorite } = this.state;
    const componentFavorite = true;
    return (
      <div data-testid="page-favorites">
        {loading ? 'Carregando...'
          : favorite.map((elemento) => (
            <MusicCard
              key={ elemento.trackId }
              songs={ elemento }
              songsFavorites={ [favorite] }
              componentFavorite={ componentFavorite }
              funcAtt={ () => this.funcAtt() }
            />))}
      </div>
    );
  }
}
