// import { Button } from 'bootstrap';
import { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import style from '../style/ProfileEdit.module.css';
import Loading from './Loading';
import { Label, Input, FormFeedback, FormText, FormGroup, Spinner } from 'reactstrap';

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
    const { loading, name, email, description, image, habilit, redirect } = this.state;
    return (
      <main data-testid="page-profile-edit" id={ style.main }>
				<div id={ style.divMain }>
					<h1>ProfileEdit</h1>
					<div id={ style.f }>
						<img src={ image } alt={ name } />
						{loading ? <Spinner color="danger" /> : <FormGroup id={ style.formGroup }>
							<Label for="exampleEmail">
								Nome
							</Label>
							<Input name="name" valid={ name.length > 0 } invalid={ !name.length > 0 } value={ name } onChange={ this.attText }/>
							<FormFeedback valid={ name.length > 0 }>
								{name.length > 0 ? 'Nome Válido' : 'Nome Inválido'}
							</FormFeedback>
							<FormText >
							</FormText>
						</FormGroup>}
						{loading ? null : <FormGroup id={ style.formGroup }>
							<Label for="exampleEmail">
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
							data-testid="edit-input-description"
							value={ description }
							name="description"
							onChange={ this.attText }
						/>}
						{loading ? null : <input
							data-testid="edit-input-image"
							value={ image }
							name="image"
							onChange={ this.attText }
						/>}
						{loading ? null
						: <button
						data-testid="edit-button-save"
						disabled={ habilit }
						onClick={ this.savedButton }
						type="submit"
					  >
						  Salvar
					  </button>}
					{redirect ? <Loading from='teste' /> : null}
				</div>
			</div>
      </main>
    );
  }
}
