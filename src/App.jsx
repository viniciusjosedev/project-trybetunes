import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Loading from './pages/Loading';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/album/:id">
          <Header />
          <Album />
        </Route>
        <Route
          exact
          path="/profile/edit"
        >
          <Header />
          <ProfileEdit />
        </Route>
        <Route exact path="/profile">
          <Header />
          <Profile />
        </Route>
        <Route exact path="/favorites">
          <Header />
          <Favorites />
        </Route>
        <Route exact path="/search">
          <Header />
          <Search />
        </Route>
        <Route exact path="/loading" render={ () => <Loading /> } />
        <Route exact path="/"><Login /></Route>
        <Route exact path="*"><NotFound /></Route>
      </Switch>
    );
  }
}

export default App;