import React, { Component } from 'react';
export class Register extends Component {
  static displayName = Register.name;

  render () {
    return (
      <div>
        <input type="text" value="login"/>
        <input type="text" value="name"/>
        <input type="text" value="password"/>
        <button></button>
      </div>
    );
  }
}
