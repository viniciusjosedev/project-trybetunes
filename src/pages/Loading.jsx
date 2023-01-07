import { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Loading extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const number = 1500;
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, number);
  }

  render() {
    const { loading } = this.state;
    // console.log(loading);
    return (
      <>
        <h1>Carregando...</h1>
        {!loading ? <Redirect to="/search" /> : null}
      </>
    );
  }
}
