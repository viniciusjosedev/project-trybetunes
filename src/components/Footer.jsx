import { Component } from "react";
import style from '../style/Footer.module.css';

export default class Footer extends Component {
  render() {
		return (
			<footer id={ style.footer }>
				<h1 id={ style.h1Header }>Desenvolvido com React.js</h1>
				<h1>2023 © Vinicius José</h1>
			</footer>
    )
	}
}
