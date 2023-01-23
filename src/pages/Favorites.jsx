import { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import style from '../style/Favorites.module.css';
import { Spinner } from 'reactstrap';

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
      <main data-testid="page-favorites" id={ style.main }>
				<div id={ style.divMain }>
					<h1 id={ style.header }>Favoritos</h1>
						<div id={ style.divTrackInfo }>
						{loading ? <Spinner color="danger" />
							: trackInfo.map((elemento) => (
								<MusicCard
									key={ elemento.trackId }
									forceAtt={ this.forceAtt }
									trackInfo={ elemento }
								/>))}
					</div>
				</div>
      </main>
    );
  }
}
