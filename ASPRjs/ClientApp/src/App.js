import React, { Component } from 'react';
import { Route } from 'react-router';
import { Switch, Redirect } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
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
import { Contact } from './components/Contact/Contact';
import { About } from './components/About/About';
import axios from 'axios';

import './custom.css'
import './css/fontello.css'

export default class App extends Component {
  static displayName = App.name;

  constructor(props){
    super(props);
    this.state = {
      login: "",
      name: "",
      role: 0,
      loading: true,
      sub_load1: true,
      sub_load2: true,
      allIngredients: [],
      userIngredients: [],
      cookie: false
    }
    this.setCookie = this.setCookie.bind(this);
    this.hideCookie = this.hideCookie.bind(this);
  }

  componentDidMount() {
    axios.get("Community/User/IsLogged")
    .then((resp) => {
        this.setState({
          login: resp.data.login, 
          name: resp.data.name, 
          role: resp.data.role,
          allIngredients: resp.data.allIngredients.ingredients,
          userIngredients: resp.data.ingredients.ingredients,
          cookie: resp.data.cookies
        })
        
        if(resp.status == 204) this.setState({loading: false})
        else {
          if(resp.data.role === 3) this.setState({sub_load1: false, sub_load2: false})
          else if(resp.data.role === 2) this.setState({sub_load1: false, sub_load2: true})
          else if(resp.data.role === 1) this.setState({sub_load1: true, sub_load2: true})
        }
    })
    .catch(() => {})
    .finally(() => {
      this.setState({loading: false})
    })
  }

  setCookie() {
    axios.put("Community/User/setCookie").catch(() => {}).finally(() => this.setState({cookie: true}));
  }
  hideCookie() {
    this.setCookie({cookie: true});
  }

  render () {
    return (
      this.state.loading === false ?
      <>
      {!this.state.cookie ? 
        <div className='cookieContainer container'>
          <div className='row'>
            <div className='col-md-8 my-auto'>Klikając przycisk "Zgoda" wyrażasz zgodę na użycie wymaganych plików cookie do prawidłowego działania aplikacji.</div>
            <div className='col-md-4 mt-3 mt-md-auto'>
              <div className='container mt-2'>
                <div className='row'>
                  <div id='agree' className='col-5 px-md-2 py-md-3' onClick={this.setCookie}>Zgoda</div>
                  <div id='disagree' className='col-5 px-md-2 py-md-3' onClick={this.hideCookie}>Ukryj</div>
                </div>
              </div>
            </div>
          </div>
        </div> 
        : 
        null
      }
      <Layout appdata={this.state.login} approleA={this.state.sub_load1} approleB={this.state.sub_load2}>
        <Switch>
          <Route exact path='/'><Home appdata={this.state.login}/></Route>
          <Route path='/view-all'>{!this.state.login || this.state.sub_load1 === true ? <Redirect to="/login"/> : <ViewAll appdata={this.state.login}/>}</Route>
          <Route path='/user-search'>{!this.state.login || this.state.sub_load1 === true ? <Redirect to="/login"/> : <ViewUser appdata={this.state.login}/>}</Route>
          <Route path='/login'>{this.state.login ? <Redirect to="/"/> : <LoginUser appdata={this.state.login}/>}</Route>
          <Route path='/register'>{this.state.login ? <Redirect to="/"/> : <Register appdata={this.state.login}/>}</Route>
          <Route path='/addrecipe'>{!this.state.login || this.state.sub_load1 === true ? <Redirect to="/login"/> : <AddRecipe appdata={this.state.login} approleA={this.state.sub_load1}/>}</Route>
          <Route path='/recipes'>{!this.state.login? <Redirect to="/login"/> : <ViewRecipe appdata={this.state.login}/>}</Route>
          <Route path='/user-panel'>{!this.state.login ? <Redirect to="/login"/> : <UserPanel appdata={this.state.login} appdata2={this.state.name} userIng={this.state.userIngredients} allIng={this.state.allIngredients}/>}</Route>
          <Route path='/change-role'>{!this.state.login || this.state.sub_load2 === true ? <Redirect to="/login"/> : <ChangeRole appdata={this.state.login}/>}</Route>
          <Route path='/contact'>{!this.state.login? <Redirect to="/login"/> : <Contact appdata={this.state.login}/>}</Route>
          <Route path='/About'><About/></Route>
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
