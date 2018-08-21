
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Nav, Navbar, NavItem,Grid } from 'react-bootstrap';
import Player from "./Player";
import PlayerOrig from "./PlayerOrig";
import Home from "./Home";
import PlayerJOI from "./PlayerJOI";
import TestJoi from "./TestJoi";
import PlayerReactJoi from "./PlayerReactJoi";
import MyPlayer from './MyPlayer';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/player' component={Player} />
      <Route path='/playerOrig' component={PlayerOrig} />
      <Route path='/playerJOI' component={PlayerJOI} />
      <Route path='/playerReactJOI' component={PlayerReactJoi} />
      <Route path='/TestJoi' component={TestJoi} />
      <Route path='/MyPlayer' component={MyPlayer} />
    </Switch>
  </main>
)

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <Navbar>
    <Nav>
      <NavItem eventKey={1}><Link to='/'>Home</Link></NavItem>
      <NavItem eventKey={2}><Link to='/player'>Player</Link></NavItem>
      <NavItem eventKey={3}><Link to='/playerOrig'>Player Formsy Original</Link></NavItem>
      <NavItem eventKey={4}><Link to='/playerJOI'>Player JOI</Link></NavItem>
      <NavItem eventKey={5}><Link to='/playerReactJOI'>Player React JOI</Link></NavItem>
      <NavItem eventKey={6}><Link to='/TestJoi'>Test Joi</Link></NavItem>
      <NavItem eventKey={7}><Link to='/MyPlayer'>My custom component</Link></NavItem>
    </Nav>
  </Navbar>
)

const App = () => (
  <Grid>
    <Header />
    <Main />
  </Grid>
)

export default App;