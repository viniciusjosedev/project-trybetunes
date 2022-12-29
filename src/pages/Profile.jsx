import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';

export default class Profile extends Component {
  state = {
    loading: true,
    user: undefined,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    // console.log(user);
    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <h1>Carregando...</h1> : null}
        <h1>{loading ? null : user.name}</h1>
        <h1>{loading ? null : user.name}</h1>
        <h1>{loading ? null : user.email}</h1>
        <h1>{loading ? null : user.description}</h1>
        {loading ? null : <img
          data-testid="profile-image"
          src={ user.image }
          alt={ user.name }
        />}
        <br />
        {loading ? null : <Link to="/profile/edit">Editar perfil</Link>}
      </div>
    );
  }
}
