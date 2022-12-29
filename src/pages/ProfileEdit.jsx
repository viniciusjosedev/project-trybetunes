import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    inputName: '',
    inputEmail: '',
    inputDescription: '',
    inputImage: '',
    habilit: true,
    redirect: false,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      inputName: user.name,
      inputEmail: user.email,
      inputDescription: user.description,
      inputImage: user.image,
    });
  }

  attText = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      const { inputName, inputEmail, inputDescription, inputImage } = this.state;
      if (inputName.length > 0
        && inputEmail.length > 0
        && inputDescription.length > 0 && inputImage.length > 0
        && inputEmail.includes('@')) {
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

  clickButton = () => {
    const { inputName, inputEmail, inputDescription, inputImage } = this.state;
    updateUser({
      name: inputName,
      email: inputEmail,
      image: inputImage,
      description: inputDescription,
    });
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { inputName, inputEmail, inputDescription, inputImage, habilit,
      redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        {redirect ? <Redirect to="/profile" /> : null}
        <label htmlFor="input-name">
          <input
            id="input-name"
            name="inputName"
            value={ inputName }
            onChange={ this.attText }
            data-testid="edit-input-name"
            type="text"
          />
        </label>
        <br />
        <label htmlFor="input-email">
          <input
            id="input-email"
            required
            name="inputEmail"
            onChange={ this.attText }
            value={ inputEmail }
            data-testid="edit-input-email"
            type="email"
          />
        </label>
        <br />
        <label htmlFor="input-description">
          <input
            id="input-description"
            name="inputDescription"
            onChange={ this.attText }
            value={ inputDescription }
            data-testid="edit-input-description"
            type="text"
          />
        </label>
        <br />
        <label htmlFor="input-image">
          <input
            id="input-image"
            name="inputImage"
            onChange={ this.attText }
            value={ inputImage }
            data-testid="edit-input-image"
            type="text"
          />
        </label>
        <br />
        <button
          disabled={ habilit }
          type="submit"
          onClick={ this.clickButton }
          data-testid="edit-button-save"
        >
          Salvar
        </button>
      </div>
    );
  }
}
