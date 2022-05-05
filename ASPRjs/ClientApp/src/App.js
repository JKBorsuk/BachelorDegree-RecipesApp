import React, { Component } from 'react';
import { Route } from 'react-router';
import { Switch, Redirect } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { ViewAll } from './components/Recipes/ViewAll';
import { ViewUser } from './components/User/ViewUser';
import { LoginUser } from './components/User/LoginUser';
import { Register } from './components/User/Register';
import { AddRecipe } from './components/Recipes/AddRecipe';
import { ViewRecipe } from './components/Recipes/ViewRecipe';
import { UserPanel } from './components/User/UserPanel';
import { Logout } from './components/User/Logout';
import { ChangeRole } from './components/User/ChangeRole';
import axios from 'axios';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  constructor(props){
    super(props);
    this.state = {
      login: "",
      loading: true
    }
  }

  componentDidMount() {
    axios.get("Community/User/IsLogged")
    .then((resp) => {
        this.setState({login: resp.data, loading: false});
    })
    .catch(() => {})
}

  render () {
    return (
      this.state.loading == false ?
      <>
      <Layout appdata={this.state.login}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/counter' component={Counter} />
          <Route path='/fetch-data' component={FetchData} />
          <Route path='/view-all'><ViewAll appdata={this.state.login}/></Route>
          <Route path='/user-search'><ViewUser appdata={this.state.login}/></Route>
          <Route path='/login'><LoginUser appdata={this.state.login}/></Route>
          <Route path='/register'><Register appdata={this.state.login}/></Route>
          <Route path='/addrecipe'><AddRecipe appdata={this.state.login}/></Route>
          <Route path='/recipes'><ViewRecipe appdata={this.state.login}/></Route>
          <Route path='/user-panel'><UserPanel appdata={this.state.login}/></Route>
          <Route path='/change-role'><ChangeRole appdata={this.state.login}/></Route>
          <Route path='/logout' component={Logout}/>
          <Redirect to='/'/>
        </Switch>
      </Layout>
      </>
      :
      null
    );
  }
}
