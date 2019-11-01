import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div >
        <ul className="menu">
          <li className="menuItem"><Link to="/">Home</Link></li>
          <li className="menuItem"><Link to="/login">Login</Link></li>
          <li className="menuItem"><Link to="/register">Register</Link></li>
        </ul>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    );
  }
}

export default App;
