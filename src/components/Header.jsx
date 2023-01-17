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
    search: '#EFF2EF',
    favorites: '#EFF2EF',
    profile: '#EFF2EF',
  };

  async componentDidMount() {
    const user = await getUser();
    this.funcInitial();
    this.setState({
      user,
      loading: false,
    });
  }

  funcInitial = () => {
    const { history } = this.props;
    const cor = history.location.pathname.slice(1, history.location.pathname.length);
    // console.log(cor);
    this.setState({
      [cor]: '#B967D7',
    });
  };

  funcDinamic = ({ target: { name } }) => {
    this.setState({
      search: '#EFF2EF',
      favorites: '#EFF2EF',
      profile: '#EFF2EF',
    }, () => {
      this.setState({
        [name]: '#B967D7',
      });
    });
  };

  render() {
    const { user: { name } = '', loading, search, favorites, profile } = this.state;
    const teste = 'link-to-favorite';
    return (
      <header data-testid="header-component" id={ style.header }>
        <div id={ style.divTitle }>
          {
            !loading
              ? <div id={ style.divTitle2 }>
                <h1 id={ style.title }>TrybeTunes</h1>
                <div id={ style.divProfile }>
                  <img id={ style.img } src={ image } alt="" />
                  <h1 id={ style.profile } data-testid="header-user-name">{name}</h1>
                </div>
              </div>
              : null
          }
        </div>
        {loading ? <Spinner id={ style.spinner } color="primary" /> : null}
        <div id={ style.divLink }>
          {!loading
            ? <Link
              className={ style.links }
              data-testid="link-to-search" to="/search"
              name="search"
              style={ { backgroundColor: search, color: search === '#B967D7' ? 'white' : 'blue' } }
              onClick={ this.funcDinamic }
            >
              Pesquisar
            </Link> : null}
          {!loading
            ? <Link
              data-testid={ teste }
              className={ style.links } to="/favorites"
              style={ { backgroundColor: favorites } }
              name="favorites"
              onClick={ this.funcDinamic }
            >
              Favoritos
            </Link> : null}
          {!loading
            ? <Link
              className={ style.links }
              data-testid="link-to-profile" to="/profile"
              style={ { backgroundColor: profile } }
              name="profile"
              onClick={ this.funcDinamic }
            >
              Perfil
            </Link> : null}
        </div>
      </header>
    );
  }
}
