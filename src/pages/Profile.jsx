import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    loading: true,
    userInfo: undefined,
  };

  async componentDidMount() {
    const userInfo = await getUser();
    this.setState({
      userInfo,
      loading: false,
    });
  }

  render() {
    const { loading, userInfo } = this.state;
    return (
      <div data-testid="page-profile">
        <h1>Profile</h1>
        {!loading ? <img
          data-testid="profile-image"
          src={ userInfo.image }
          alt={ userInfo.name }
        />
          : <h1>Carregando...</h1>}
        {!loading ? <h1>{userInfo.name}</h1> : ''}
        {!loading ? <h1>{userInfo.email}</h1> : ''}
        {!loading ? <h1>{userInfo.description}</h1> : ''}
        {!loading ? <Link to="/profile/edit">Editar perfil</Link> : ''}
      </div>
    );
  }
}
