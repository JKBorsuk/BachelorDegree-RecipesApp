import React, { Component } from 'react';
import { Route } from 'react-router';
import { Switch, Redirect } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { ViewAll } from './components/ViewAll';
import { ViewUser } from './components/ViewUser';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { AddRecipe } from './components/AddRecipe';
import { ViewRecipe } from './components/ViewRecipe';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/view-all' component={ViewAll}/>
        <Route path='/user-search' component={ViewUser} />
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/addrecipe' component={AddRecipe}/>
        <Route path='/recipes' component={ViewRecipe}/>
        <Redirect to='/' />
        </Switch>
      </Layout>
    );
  }
}
