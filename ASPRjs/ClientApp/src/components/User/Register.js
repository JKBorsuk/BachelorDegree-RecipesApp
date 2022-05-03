import React, { useState } from 'react';
import Axios from 'axios';
import './Register.css';

export function Register() {

  const[data,setData] = useState({
    login: "",
    name: "",
    password: ""
  })
  const[message,setMessage] = useState("");

  let url = "Community/User/Register";

  function handle(e) {
    if(e.target.id == 'login') setMessage("");
    const newdata = {...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }

  function submit(e) {
    e.preventDefault();
    Axios.post(url, {
      login: data.login,
      password: data.password,
      name: data.name
    }).then(() => {
      setMessage("User created");
      document.getElementById('message').style.color = "green";
    })
    .catch(function () {
      setMessage("This user already exist");
      document.getElementById('message').style.color = "red";
    })
  }

  return (
    <div className="reg-container">
      <div className="register">
        <form onSubmit={(e) => submit(e)}>
            <input
                type="text"
                id="name"
                value={data.name}
                placeholder="name"
                onChange={(e) => handle(e)}
            />
            <input
                type="text"
                id="login"
                value={data.login}
                placeholder="login"
                autoComplete="off"
                onChange={(e) => handle(e)}
            />
            <input
                type="password"
                id="password"
                value={data.password}
                placeholder="password"
                autoComplete="off"
                onChange={(e) => handle(e)}
            />
            <button>Zarejestruj się</button>
        </form>
      </div>
      <div id='message'>{message}</div>
    </div>
  );
}
