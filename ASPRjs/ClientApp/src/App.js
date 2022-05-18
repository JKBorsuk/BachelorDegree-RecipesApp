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
import { Faq } from './components/Faq/Faq';
import { ChangeRole } from './components/User/ChangeRole';
import axios from 'axios';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  constructor(props){
    super(props);
    this.state = {
      login: "",
      loading: true,
      sub_load1: true,
      sub_load2: true
    }
  }

  componentDidMount() {
    axios.get("Community/User/IsLogged")
    .then((resp) => {
        this.URole(resp.data);
    })
    .catch(() => {})
  }

  URole(props) {
    if(typeof(props) == 'string' && props.length == 0) { this.setState({sub_load1: true, loading: false}); return }
    axios.get("Community/User/URole/" + props)
    .then(resp => {
      if(resp.status == 200) {this.setState({sub_load1: false, sub_load2: false})}
      else if(resp.status == 202) {this.setState({sub_load1: false, sub_load2: true})}
      else if(resp.status == 204) this.setState({sub_load1: true, sub_load2: true})

      this.setState({login: props, loading: false})
    })
    .catch((er) => {
      console.log(er)
      this.setState({sub_load1: true, sub_load2: true})
    })
  }

  render () {
    return (
      this.state.loading == false ?
      <>
      <Layout appdata={this.state.login} approleA={this.state.sub_load1} approleB={this.state.sub_load2}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/counter' component={Counter} />
          <Route path='/fetch-data' component={FetchData} />
          <Route path='/view-all'>{!this.state.login || this.state.sub_load1 === true ? <Redirect to="/login"/> : <ViewAll appdata={this.state.login}/>}</Route>
          <Route path='/user-search'>{!this.state.login || this.state.sub_load1 === true ? <Redirect to="/login"/> : <ViewUser appdata={this.state.login}/>}</Route>
          <Route path='/login'>{this.state.login ? <Redirect to="/"/> : <LoginUser appdata={this.state.login}/>}</Route>
          <Route path='/register'>{this.state.login ? <Redirect to="/"/> : <Register appdata={this.state.login}/>}</Route>
          <Route path='/addrecipe'>{!this.state.login || this.state.sub_load1 === true ? <Redirect to="/login"/> : <AddRecipe appdata={this.state.login} approleA={this.state.sub_load1}/>}</Route>
          <Route path='/recipes'>{!this.state.login ? <Redirect to="/login"/> : <ViewRecipe appdata={this.state.login}/>}</Route>
          <Route path='/user-panel'>{!this.state.login ? <Redirect to="/login"/> : <UserPanel appdata={this.state.login}/>}</Route>
          <Route path='/change-role'>{!this.state.login || this.state.sub_load2 === true ? <Redirect to="/login"/> : <ChangeRole appdata={this.state.login}/>}</Route>
          <Route path='/FAQ'><Faq/></Route>
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
