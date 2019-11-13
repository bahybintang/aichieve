import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import AddIdea from './components/AddIdea';
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} /> 
          <Route path="/AddIdea" component={AddIdea} />         
        </Switch>
      </Router>
    );
  }
}

export default App;
