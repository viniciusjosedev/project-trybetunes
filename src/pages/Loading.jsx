import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import style from '../style/Loading.module.css';

export default class Loading extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const number = 2500;
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, number);
  }

  render() {
    const { loading } = this.state;
    const { from } = this.props;
    // console.log(loading);
    return (
      <div id={ style.div }>
        {/* <h1 id={ style.h1 }>Carregando...</h1> */}
        <Spinner color="danger" id={ style.spinner } />
        {!loading ? <Redirect to={ from ? '/profile' : '/search' } /> : null}
      </div>
    );
  }
}
