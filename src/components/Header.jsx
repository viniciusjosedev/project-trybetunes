import { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    loading: true,
    user: undefined,
  };

  componentDidMount() {
    getUser().then((resultado) => this.setState({ loading: false, user: resultado }));
  }

  render() {
    const { loading, user: { name } = '' } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading />
          : <h1 data-testid="header-user-name">{ `Bem vindo(a) ${name}` }</h1>}
      </header>
    );
  }
}
