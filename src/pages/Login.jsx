/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FormGroup, Spinner } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { createUser, getUser } from '../services/userAPI';
import styles from '../style/Login.module.css';
// import img from '../style/images/icons8-ellipsis-100.png';

export default class Login extends Component {
  state = {
    habilit: true,
    text: '',
    loading: false,
    color: ['#b953b5b9', '#7c137b'],
		initial: true,
  };

	async componentDidMount() {
		const logado = JSON.parse(localStorage.getItem('login'));
		const { history } = this.props;
		if (logado) history.push('/search');
		const { name } = await getUser();
		if (name)	this.setState({
			text: name,
		}, () => this.funcAtt({ target: { value: name } }))
		this.setState({
			initial: false,
		})
	}

  funcAtt = ({ target: { value } }) => {
    const entrada = value;
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

  funcaoClick = async (text) => {
		const user = await getUser();
		if (user.name === text) {
			this.setState({
				loading: true,
			});
		} else {
			createUser({ name: text });
			this.setState({
				loading: true,
			});
		}
		localStorage.setItem('login', (true))
  };

  render() {
    const { habilit, text, loading, color, initial } = this.state;
    return (
      <main data-testid="page-login" id={ styles.main }>
				{initial ? <Spinner id={ styles.spinner } color="danger" /> : <>
					{/* <CardTitle tag="h1" className={ `${styles['h1-acesso']} ${styles.title}` }>
						Trybe */}
					{/* <span id={ styles.p }>Tunes</span> */}
					{/* <Badge id={ styles.badge } color="danger">Tunes</Badge>
					</CardTitle> */}
					<div id={ styles.div }>	
						{/* <img src={ img } alt="" id={ styles.img } /> */}
						<h1 className={ styles['h1-acesso'] }>Acesso</h1>
						<FormGroup id={ styles.FormLogin } floating>
							<input
								className="form-control"
								value={ text }
								onChange={ this.funcAtt }
								data-testid="login-name-input"
								placeholder="Nome"
								type="text"
								id={ styles['input-name'] }
							/>
							<label
								htmlFor="input-name"
								id="input-name"
							>
								Nome
							</label>
						</FormGroup>
						{/* <input	
							className="form-control"
							value={ text }
							onChange={ this.funcAtt }
							data-testid="login-name-input"
							placeholder="Nome"
							type="text"
							id="input-name"
						/> */}
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
					</>}
      </main>
    );
  }
}
