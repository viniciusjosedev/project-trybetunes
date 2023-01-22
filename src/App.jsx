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
        <Route
          exact
          path="/album/:id"
          render={ (props) => (
            <>
              <Header { ...props } />
              <Album { ...props } />
            </>
          ) }
        />
        <Route
          exact
          path="/profile/edit"
          render={ (props) => (
            <>
              <Header { ...props } />
              <ProfileEdit />
            </>
          ) }
        />
        <Route
          exact
          path="/profile"
          render={ (props) => (
            <>
              <Header { ...props } />
              <Profile />
            </>
          ) }
        />
        <Route
          exact
          path="/favorites"
          render={ (props) => (
            <>
              <Header { ...props } />
              <Favorites />
            </>
          ) }
        />
        <Route
          exact
          path="/search"
          render={ (props) => (
            <>
              <Header { ...props } />
              <Search />
            </>
          ) }
        />

        <Route exact path="/loading" render={ () => <Loading /> } />
        <Route exact path="/"><Login /></Route>
        <Route exact path="*"><NotFound /></Route>
      </Switch>
    );
  }
}

export default App;
