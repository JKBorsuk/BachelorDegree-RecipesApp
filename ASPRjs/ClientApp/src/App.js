import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { ViewAll } from './components/ViewAll';
import { ViewUser } from './components/ViewUser';
import { Login } from './components/Login';
import { Register } from './components/Register';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/view-all' component={ViewAll}/>
        <Route path='/user-search' component={ViewUser} />
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </Layout>
    );
  }
}
