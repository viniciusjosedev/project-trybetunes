import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/search"><Search /></Route>
        <Route exact path="/album/:id"><Album /></Route>
        <Route exact path="/favorites"><Favorites /></Route>
        <Route exact path="/profile/edit"><ProfileEdit /></Route>
        <Route exact path="/profile"><Profile /></Route>
        <Route exact path="/"><Login /></Route>
        <Route exact path="*"><NotFound /></Route>
      </Switch>
    );
  }
}

export default App;
