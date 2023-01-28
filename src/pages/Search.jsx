import { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormGroup, Input, Button, Spinner } from 'reactstrap';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import style from '../style/Search.module.css';

export default class Search extends Component {
  state = {
    text: '',
    habilit: true,
    loading: false,
    user: undefined,
    artist: undefined,
    clicado: undefined,
  };

  clickButton = () => {
    const { text } = this.state;
    this.setState({
      text: '',
      loading: true,
    });
    searchAlbumsAPI(text).then((user) => {
			if (user.length > 0) {
				this.setState({
					user,
					loading: false,
					clicado: false,
					habilit: true,
				})
			} else {
				this.setState({
					loading: false,
					clicado: true,
					habilit: true,
				})
			}
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
    const { text, habilit, loading, user, artist, clicado } = this.state;
    // console.log(user);
    return (
      <main data-testid="page-search" id={ style.main }>
				<div id={ style.divCard }>
					<h1 id={ style.h1Pesquisa }>Pesquisar</h1>
					{loading ? <Spinner color="primary">Carregando</Spinner> : <FormGroup id={ style.formgFormTextroupId } onChange={ (event) => this.attText(event) } value={ text }>
						{/* <Label for="exampleEmail" id={ style.FormText }>
							Encontre
						</Label> */}
						<Input placeholder="Digite uma banda ou um cantor" id={ style.InputFormGroup } valid={ text.length >= 2 ? true : false } />
						{/* <FormFeedback valid>
							Sweet! that name is available
						</FormFeedback> */}
					</FormGroup>}
					<Button
						data-testid="search-artist-button"
						id={ style.button }
						disabled={ habilit }
						aria-label="Pesquisar"
						type="submit"
						onClick={ this.clickButton }
						value="pesquisar"
					>
						{loading ? '' : 'Pesquisar'}
					</Button>
					<h1 style={ { color: 'white', fontWeight: 'bolder' } }>{user ? `Resultado de álbuns de: ${artist}` : ''}</h1>
					<div id={ style.divMusics }>
						{user ? user.map((elemento) => (
							<Link className={ style.link } to={ `/album/${elemento.collectionId}` } key={ elemento.collectionId }>
								<div id={ style.divMusic }>
									{/* <h1>{elemento.artistName}</h1> */}
									<div id={ style.divImg }>
										<Link to={ `/album/${elemento.collectionId}` }><img src={elemento.artworkUrl100} alt={ elemento.artistName } id={ style.img } /></Link>
									</div>
									<Link
										data-testid={ `link-to-album-${elemento.collectionId}` }
										className={ style.link }
										key={ elemento.collectionId }
										to={ `/album/${elemento.collectionId}` }
									>
										<h3 style={ { color: '#DC3545', fontWeight: 'bolder' } }>{elemento.collectionName}</h3>
									</Link>
								</div>
							</Link>
						)) : null }
						{clicado ? <h1>Nenhum álbum foi encontrado</h1> : null}
					</div>
				</div>
      </main>
    );
  }
}
