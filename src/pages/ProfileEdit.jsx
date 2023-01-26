import { Component } from 'react';
import { getUser, updateUser } from '../services/userAPI';
import style from '../style/ProfileEdit.module.css';
import Loading from './Loading';
import { Label, Input, FormFeedback, FormText, FormGroup, Spinner, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

export default class ProfileEdit extends Component {
  state = {
    loading: true,
    name: undefined,
    email: undefined,
    description: undefined,
    image: undefined,
    habilit: true,
    redirect: false,
  };

  async componentDidMount() {
    const { name, email, description, image } = await getUser();
    this.setState({
      name,
      email,
      description,
      image,
      loading: false,
    }, () => this.funcVerific());
  }

  funcVerific = () => {
    const { name, email, description, image } = this.state;
    const verific = name.length > 0
    && email.length > 0 && description.length > 0 && image.length > 0
    && email.includes('@');
    if (verific) {
      this.setState({
        habilit: false,
      });
    } else {
      this.setState({
        habilit: true,
      });
    }
  };

  attText = ({ target }) => {
    // const { name, email, description, image, habilit } = this.state;
    // console.log(target.value);
    this.setState({
      [target.name]: target.value,
    }, () => this.funcVerific());
  };

  savedButton = async () => {
    const { name, email, description, image } = this.state;
    // const { history } = this.props;
    this.setState({
      loading: true,
    });
    await updateUser({ name, email, description, image });
    this.setState({
      loading: false,
      redirect: true,
    });
    // history.push('/profile');
		// // history.goBack()
  };

  render() {
    const { loading, name, email, description, image, habilit, redirect, history } = this.state;
    return (
      <main data-testid="page-profile-edit" id={ style.main }>
				<div id={ style.divMain }>
					{loading ? <Spinner id={ style.Spinner } color="danger" /> : <h1 id={ style.h1Header }>Configurações</h1>}
					<div id={ style.divInfo }>
						<div id={ style.divImg }>
							{loading ? null : <>
							<img src={ image } alt="Foto não encontrada" id={ style.img } />
							<FormGroup className={ style.formGroup }>
								<Label for="exampleEmail" className={ style.label }>
									Insira uma URl de imagem
								</Label>
								<Input name="image" valid={ image.length > 0 } invalid={ !image.length > 0 } value={ image } onChange={ this.attText }/>
								<FormFeedback valid={ image.length > 0 }>
									{image.length > 0 ? 'imagem Válida' : 'imagem Inválida'}
								</FormFeedback>
								<FormText >
								</FormText>
							</FormGroup>
							</>}
						</div>
						<div id={ style.divInputs }>
							{loading ? null : <FormGroup className={ style.formGroup }>
								<Label for="exampleEmail" className={ style.label }>
									Nome
								</Label>
								<Input name="name" valid={ name.length > 0 } invalid={ !name.length > 0 } value={ name } onChange={ this.attText }/>
								<FormFeedback valid={ name.length > 0 } style={ { fontWeight: 'bolder', } }>
									{name.length > 0 ? 'Nome Válido' : 'Nome Inválido'}
								</FormFeedback>
								<FormText >
								</FormText>
							</FormGroup>}
							{loading ? null : <FormGroup className={ style.formGroup }>
								<Label for="exampleEmail" className={ style.label }>
									Email
								</Label>
								<Input name="email" valid={ email.length > 0 && email.includes('@')} invalid={ !email.length > 0 || !email.includes('@')} value={ email } onChange={ this.attText }/>
								<FormFeedback valid={ email.length > 0 && email.includes('@') }>
									{email.length > 0 && email.includes('@') ? 'Email Válido' : 'Email Inválido'}
								</FormFeedback>
								<FormText >
								</FormText>
							</FormGroup>}
							{loading ? null : <textarea
								id={ style.textarea }
								placeholder="Descrição"
								data-testid="edit-input-description"
								value={ description }
								name="description"
								onChange={ this.attText }
							/>}
					</div>
					{redirect ? window.location.assign('http://localhost:3000/profile') : null}
				</div>
				{loading ? null
					: <Button
					color="danger"
					id={ style.button }
					data-testid="edit-button-save"
					disabled={ habilit }
					onClick={ this.savedButton }
					type="submit"
					>
						Salvar
					</Button>}
			</div>
      </main>
    );
  }
}
