import { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export default class CompletHeader extends Component {
  render() {
    const { user: { name } } = this.props;
    return (
      <>
        <h1 data-testid="header-user-name">{ `Bem vindo(a) ${name}` }</h1>
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </>

    );
  }
}

CompletHeader.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

CompletHeader.defaultProps = {
  user: { name: 'user' },
};
