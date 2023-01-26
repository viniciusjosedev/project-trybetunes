import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Spinner } from 'reactstrap';
import { getUser } from '../services/userAPI';
import style from '../style/Profile.module.css';
import imgDefault from '../style/images/profile-100.png';

export default class Profile extends Component {
  state = {
    loading: true,
    userInfo: undefined,
  };

  async componentDidMount() {
    const userInfo = await getUser();
    this.setState({
      userInfo,
      loading: false,
    });
  }

  render() {
    const { loading, userInfo } = this.state;
    return (
      <main data-testid="page-profile" id={ style.main }>
				<div id={ style.divMain }>
					<h1 id={ style.h1Profile }>Perfil</h1>
					<div id={ style.divInfo }>
						<div id={ style.divImg }>
							{!loading ? <img
							id={ style.img }
								data-testid="profile-image"
								src={ userInfo.image.length > 0 ? userInfo.image : imgDefault}
								alt={ userInfo.name }
							/>
								: <Spinner color="danger" />}
						</div>
						{!loading ? <h3 className={ style.info }>Nome: {userInfo.name}</h3> : null}
						{!loading ? <h3 className={ style.info }>Email: {userInfo.email}</h3> : null}
						<div id={ style.divDescription }>
							{!loading ? <h3 className={ style.info }>Descrição: {userInfo.description}</h3> : null}
						</div>
						<div id={ style.divButton }>
							{!loading ? <Link to="/profile/edit"><Button id={ style.button } color="danger">Editar perfil</Button></Link> : null}
						</div>
					</div>
					</div>
      </main>
    );
  }
}
