import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { getUser } from '../services/userAPI';
import style from '../style/Header.module.css';
import image from '../style/images/profile-50.png';

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
      <header data-testid="header-component" id={ style.header }>
        <div id={ style.divTitle }>
          {
            !loading
              ? <div>
                <h1 id={ style.title }>TrybeTunes</h1>
                <div id={ style.divProfile }>
                  <img src={ image } alt="" />
                  <h1 id={ style.profile } data-testid="header-user-name">{name}</h1>
                </div>
              </div>
              : null
          }
        </div>
        {loading ? <Spinner id={ style.spinner } color="primary" /> : null}
        <div id={ style.divLink }>
          {!loading
            ? <Link data-testid="link-to-search" to="/search">Pesquisar</Link> : null}
          <Link
            data-testid="link-to-favorites"
            to="/favorites"
          >
            {!loading ? 'Favoritos' : ''}
          </Link>
          {!loading
            ? <Link data-testid="link-to-profile" to="/profile">Perfil</Link> : null}
        </div>
      </header>
    );
  }
}
