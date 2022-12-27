import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class SearchFilter extends Component {
  render() {
    const { name, artist } = this.props;
    return (
      <>
        <h2>
          Resultado de álbuns de:
          {' '}
          {name}
        </h2>
        {artist.length > 0
          ? artist.map((elemento) => (
            <div key={ elemento.collectionId }>
              {' '}
              { elemento.collectionName }
              {' '}
              <Link
                data-testid={ `link-to-album-${elemento.collectionId}` }
                to={ `/album/${elemento.collectionId}` }
              >
                Album
              </Link>
            </div>))
          : <h3>Nenhum álbum foi encontrado</h3>}
      </>
    );
  }
}

SearchFilter.propTypes = {
  name: PropTypes.string,
  artist: PropTypes.arrayOf(PropTypes.objectOf),

};

SearchFilter.defaultProps = {
  name: '',
  artist: [],
};
