import { Component } from 'react';
import { getUser } from '../services/userAPI';
import CompletHeader from './CompletHeader';

export default class Header extends Component {
  state = {
    loading: true,
    user: undefined,
  };

  componentDidMount() {
    getUser().then((resultado) => this.setState({ loading: false, user: resultado }));
  }

  render() {
    const { loading, user = {} } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading
            ? <h1>Carregando</h1>
            : <CompletHeader user={ user } />
        }
      </header>
    );
  }
}
