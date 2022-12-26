import { Component } from 'react';

export default class Search extends Component {
  state = {
    text: '',
    habilit: true,
  };

  attText = (event) => {
    const { target: { value } } = event;
    this.setState({
      text: value,
    }, () => {
      if (value.length >= 2) {
        this.setState({
          habilit: false,
        });
      } else {
        this.setState({
          habilit: true,
        });
      }
    });
  };

  render() {
    const { text, habilit } = this.state;
    return (
      <div data-testid="page-search">
        <p>Search</p>
        <input
          data-testid="search-artist-input"
          type="text"
          placeholder="Digite o nome do cantor(a) ou banda"
          onChange={ this.attText }
          value={ text }
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ habilit }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
