import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    user: undefined,
    loading: true,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const { user: { name } = '', loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          !loading
            ? <h1 data-testid="header-user-name">{name}</h1>
            : <h1>Carregando...</h1>
        }
        {!loading ? <Link data-testid="link-to-search" to="/search">Pesquisar</Link> : ''}
        <Link
          data-testid="link-to-favorites"
          to="/favorites"
        >
          {!loading ? 'Favoritos' : ''}
        </Link>
        {!loading ? <Link data-testid="link-to-profile" to="/profile">Perfil</Link> : ''}
      </header>
    );
  }
}
