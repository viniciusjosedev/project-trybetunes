import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, CardTitle } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import styles from '../style/Login.module.css';

export default class Login extends Component {
  state = {
    habilit: true,
    text: '',
    loading: false,
    color: ['#b953b5b9', '#7c137b'],
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
        color: ['#7c137b', '#ffffff'],
      });
    } else {
      this.setState({
        habilit: true,
        color: ['#b953b5b9', '#7c137b'],
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
    const { habilit, text, loading, color } = this.state;
    return (
      <main data-testid="page-login" id={ styles.main }>
        <CardTitle tag="h1" className={ `${styles['h1-acesso']} ${styles.title}` }>
          Trybe
          <span id={ styles.p }>Tunes</span>
          {/* <Badge id={ styles.badge } color="danger">Tunes</Badge> */}
        </CardTitle>
        <div id={ styles.div }>
          <h1 className={ styles['h1-acesso'] }>Acesso</h1>
          {/* <FormGroup id={ styles.FormLogin } floating>
            <input
              className="form-control"
              value={ text }
              onChange={ this.funcAtt }
              data-testid="login-name-input"
              placeholder="Nome"
              type="text"
              id="input-name"
            />
            <label
              htmlFor="input-name"
              id="input-name"
            >
              Nome
            </label>
          </FormGroup> */}
          <input
            className="form-control"
            value={ text }
            onChange={ this.funcAtt }
            data-testid="login-name-input"
            placeholder="Nome"
            type="text"
            id="input-name"
          />
          <br />
          <Button
            // color={ !habilit ? 'danger' : 'secondary' }
            style={ { backgroundColor: color[0], color: color[1] } }
            type="submit"
            disabled={ habilit }
            data-testid="login-submit-button"
            onClick={ () => this.funcaoClick(text) }
            id={ styles.button }
          >
            Entrar
          </Button>
          {loading ? <Redirect to="/loading" /> : ''}
        </div>
      </main>
    );
  }
}
