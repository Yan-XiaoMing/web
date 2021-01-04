import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/login/Login'


export default class App extends Component{
  render(){
    return (

      <HashRouter>
        <Switch>
          <Route path='/' component={Login}/>
        </Switch>
      </HashRouter>

    );
  }
}




