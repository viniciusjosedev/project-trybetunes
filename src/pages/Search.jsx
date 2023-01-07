import { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    text: '',
    habilit: true,
    loading: false,
    user: undefined,
    artist: undefined,
  };

  clickButton = () => {
    const { text } = this.state;
    this.setState({
      text: '',
      loading: true,
    });
    searchAlbumsAPI(text).then((user) => {
      // console.log(user);
      this.setState({
        user,
        loading: false,
      });
    });
  };

  attText({ target: { value } }) {
    this.setState({
      text: value,
      artist: value,
    }, () => {
      if (value.length >= 2) {
        this.setState({
          habilit: false,
        });
      } else {
        this.setState({
          habilit: true,
        });
      }
    });
  }

  render() {
    const { text, habilit, loading, user, artist } = this.state;
    return (
      <main data-testid="page-search">
        <h1>Search</h1>
        {loading ? <h1>Carregando</h1> : <input
          onChange={ (event) => this.attText(event) }
          value={ text }
          type="text"
          data-testid="search-artist-input"
        />}
        <button
          data-testid="search-artist-button"
          disabled={ habilit }
          aria-label="Pesquisar"
          type="submit"
          onClick={ this.clickButton }
          value="pesquisar"
        >
          {loading ? '' : 'Pesquisar'}
        </button>
        <h1>{user ? `Resultado de álbuns de: ${artist}` : ''}</h1>
        <div>
          {user ? user.map((elemento) => (
            <div key={ elemento.collectionId }>
              {/* <h1>{elemento.artistName}</h1> */}
              <h1>{elemento.collectionName}</h1>
              <Link
                data-testid={ `link-to-album-${elemento.collectionId}` }
                key={ elemento.collectionId }
                to={ `/album/${elemento.collectionId}` }
              >
                Album
              </Link>
            </div>
          )) : <h1>Nenhum álbum foi encontrado</h1> }
        </div>
      </main>
    );
  }
}
