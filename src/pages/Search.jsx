import { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import CompletSearch from './CompletSearch';
import SearchFilter from './SearchFilter';

export default class Search extends Component {
  state = {
    text: '',
    habilit: true,
    loading: false,
    artist: [false],
    name: '',
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

  clickButton = async () => {
    const { text } = this.state;
    this.setState({
      text: '',
    });
    this.setState({
      loading: true,
      name: text,
    }, () => {
      searchAlbumsAPI(text).then((resultado) => {
        this.setState({
          loading: false,
          artist: [true, resultado],
        });
      });
    });
  };

  render() {
    const { text, habilit, loading, artist, name } = this.state;
    const dict = { text, habilit };
    return (
      <div data-testid="page-search">
        {loading ? <Loading /> : <CompletSearch
          { ...dict }
          clickButton={ this.clickButton }
          attText={ this.attText }
        />}
        {artist[0] ? <SearchFilter name={ name } artist={ artist[1] } /> : ''}
      </div>
    );
  }
}
