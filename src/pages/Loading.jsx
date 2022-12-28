import { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Loading extends Component {
  state = {
    redirect: false,
  };

  componentDidMount() {
    const time = 1500;
    setTimeout(() => {
      this.setState({
        redirect: true,
      });
    }, time);
  }

  render() {
    const { redirect } = this.state;
    return (
      <div>
        <h1>Carregando...</h1>
        {redirect ? <Redirect to="/search" /> : ''}
      </div>
    );
  }
}
