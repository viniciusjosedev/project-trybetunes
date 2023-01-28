import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Spinner } from 'reactstrap';
import { getUser } from '../services/userAPI';
import style from '../style/Header.module.css';
import image from '../style/images/profile-50.png';

export default class Header extends Component {
  state = {
    user: undefined,
    loading: true,
    search: 'white',
    favorites: 'white',
    profile: 'white',
  };

  async componentDidMount() {
		this.init();
  }

	init = async () => {
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
      [cor]: '#DC3545',
    });
  };

  funcDinamic = ({ target: { name } }) => {
    this.setState({
      search: 'white',
      favorites: 'white',
      profile: 'white',
    }, () => {
      // if (name === 'search') {
      // 	this.setState({
      //   	[name]: '#B967D7',
      // 	});
      // } else if (name === 'favorites') {
      //   this.setState({
      //     [name]: '#CF6CCA',
      //   });
      // } else {
      //   this.setState({
      //     [name]: '#E066B1',
      //   });
      // }
			this.setState({
				[name]: '#DC3545',
			})
    });
  };

  render() {
    const { user: { name } = '', loading, search, favorites, profile, user } = this.state;
    const teste = 'link-to-favorite';
    return (
      <header data-testid="header-component" id={ style.header } style={ { justifyContent: loading ? 'center' : 'space-between' } }>
				{loading ? <Spinner id={ style.spinner } color="danger" /> : <>
				<div id={ style.divTitle }>
          {
            !loading
              ? <div id={ style.divTitle2 }>
                <h1 id={ style.title }>Trybe<Badge color="danger" id={ style.badge }>Tunes</Badge></h1>
                <div id={ style.divProfile }>
                  <img id={ style.img } src={ user.image.length > 0 ? user.image : image } alt="" />
                  <h1 id={ style.profile } data-testid="header-user-name">{name}</h1>
                </div>
              </div>
              : null
          }
        </div>
        <div id={ style.divLink }>
          {!loading
            ? <Link
              className={ style.links }
              data-testid="link-to-search" to="/search"
              name="search"
              style={ { color: search  } }
              onClick={ this.funcDinamic }
            >
              Pesquisar
            </Link> : null}
          {!loading
            ? <Link
              data-testid={ teste }
              className={ style.links } to="/favorites"
              style={ { color: favorites  ? favorites : '#DC3545' } }
              name="favorites"
              onClick={ this.funcDinamic }
            >
              Favoritos
            </Link> : null}
          {!loading
            ? <Link
              className={ style.links }
              data-testid="link-to-profile" to="/profile"
              style={ { color: profile  ? profile : '#DC3545' } }
              name="profile"
              onClick={ this.funcDinamic }
            >
              Perfil
            </Link> : null}
        </div>
				</>}
      </header>
    );
  }
}
