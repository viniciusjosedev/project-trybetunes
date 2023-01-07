import { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  state = {
    loading: true,
    trackInfo: undefined,
  };

  async componentDidMount() {
    await this.forceAtt();
  }

  forceAtt = async () => {
    this.setState({
      loading: true,
    });
    const trackInfo = await getFavoriteSongs();
    this.setState({
      trackInfo,
      loading: false,
    });
  };

  render() {
    const { loading, trackInfo } = this.state;
    return (
      <main data-testid="page-favorites">
        <h1>Favorites</h1>
        {loading ? <h1>Carregando...</h1>
          : trackInfo.map((elemento) => (
            <MusicCard
              key={ elemento.trackId }
              forceAtt={ this.forceAtt }
              trackInfo={ elemento }
            />))}
      </main>
    );
  }
}
