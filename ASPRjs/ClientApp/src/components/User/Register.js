import React, { Component, useState } from 'react';
import Axios from 'axios';
import './Register.css';
import { validLogin, validPassword, validName } from './Regex/regex';

export class Register extends Component {
  static displayName = Register.name;

  constructor(props) {
    super(props);
    this.state = {
      login: "",
      name: "",
      password: "",
      message: ""
    }
    this.hideMessage_R = this.hideMessage_R.bind(this);
  }

  submit(e) {
    e.preventDefault();
    if (!validName.test(this.state.name)) {
      this.setState({message: "Imię nie może być puste i mieć więcej niż 20 liter"})
      document.getElementById('name').style.borderColor = "rgb(211, 155, 52)";
      return;
    }
    else document.getElementById('name').style.borderColor = "";
    if (!validLogin.test(this.state.login)) {
      this.setState({message: "Twój login musi mieć długość od 3 do 20 znaków i składać się z samych liter"})
      document.getElementById('login').style.borderColor = "rgb(211, 155, 52)";
      return;
    }
    else document.getElementById('login').style.borderColor = "";
    if (!validPassword.test(this.state.password)) {
      this.setState({message: "Twoje hasło musi mieć długość od 6 do 20 znaków, mieć co najmniej jedną liczbę i znak specjalny"})
      document.getElementById('password').style.borderColor = "rgb(211, 155, 52)";
      return;
    }
    else document.getElementById('password').style.borderColor = "";

    Axios.post("Community/User/Register", {
      login: this.state.login,
      password: this.state.password,
      name: this.state.name
    }).then(() => {
      window.location.href = './login';
    })
    .catch(() => {
      this.setState({message: "This user already exist"});
    })
  }

  hideMessage_R() {
    this.setState({message: ""});
  }

  render() {
    return (
      <>
      <div className="reg-container">
        <div className="register">
          <div className='display-6' style={{letterSpacing: '1px', marginBottom: '1em', userSelect: 'none'}}>Register</div>
          <form onSubmit={(e) => this.submit(e)}>
              <input
                  type="text"
                  id="name"
                  value={this.state.name}
                  placeholder="name"
                  onChange={(e) => this.setState({name: e.target.value})}
              />
              <input
                  type="text"
                  id="login"
                  value={this.state.login}
                  placeholder="login"
                  autoComplete="off"
                  onChange={(e) => this.setState({login: e.target.value})}
              />
              <input
                  type="password"
                  id="password"
                  value={this.state.password}
                  placeholder="password"
                  autoComplete="off"
                  onChange={(e) => this.setState({password: e.target.value})}
              />
              <button>Zarejestruj się</button>
          </form>
        </div>
      </div>
      {this.state.message ?
        <div id='ErrorMessage-container' onClick={this.hideMessage_R}>
            <div id="ErrorMessage">{this.state.message}</div>
        </div>
        :
        null
      }
      </>
  )}
}
