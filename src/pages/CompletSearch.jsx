import { Component } from 'react';
import PropTypes from 'prop-types';

export default class CompletSearch extends Component {
  render() {
    const { text, habilit, attText, clickButton } = this.props;
    return (
      <>
        <p>Search</p>
        <input
          data-testid="search-artist-input"
          type="text"
          placeholder="Digite o nome do cantor(a) ou banda"
          onChange={ attText }
          value={ text }
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ habilit }
          onClick={ clickButton }
        >
          Pesquisar
        </button>
      </>
    );
  }
}

CompletSearch.propTypes = {
  text: PropTypes.string,
  habilit: PropTypes.bool,
  attText: PropTypes.func,
  clickButton: PropTypes.func,
};

CompletSearch.defaultProps = {
  text: '',
  habilit: true,
  attText: () => {},
  clickButton: () => {},
};
