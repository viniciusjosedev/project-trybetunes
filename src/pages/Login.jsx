import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    habilit: true,
    text: '',
    loading: false,
  };

  funcAtt = (event) => {
    const entrada = event.target.value;
    const numberTextMin = 3;
    this.setState({
      text: entrada,
    });
    if (entrada.length >= numberTextMin) {
      this.setState({
        habilit: false,
      });
    } else {
      this.setState({
        habilit: true,
      });
    }
  };

  funcaoClick = (text) => {
    createUser({ name: text });
    this.setState({
      loading: true,
    });
  };

  render() {
    const { habilit, text, loading } = this.state;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <label htmlFor="input-name">
          Nome:
          <input
            value={ text }
            onChange={ this.funcAtt }
            data-testid="login-name-input"
            type="text"
            id="input-name"
          />
        </label>
        <br />
        <button
          type="submit"
          disabled={ habilit }
          data-testid="login-submit-button"
          onClick={ () => this.funcaoClick(text) }
        >
          Entrar
        </button>
        {loading ? <Redirect to="/loading" /> : ''}
      </div>
    );
  }
}
