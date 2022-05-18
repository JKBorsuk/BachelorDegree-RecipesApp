import React, { Component } from 'react';
import { MainContainer } from './MainContainer/MainContainer';

export class Layout extends Component {
  static displayName = Layout.name;

  constructor (props) {
    super(props);
    this.state = {
      login: this.props.appdata,
      loading: true,
      s_f: this.props.approleA,
      s_s: this.props.approleB
    };
  }

  componentDidMount() {
    this.setState({loading: false})
  }
  render () {
    return (
      <div>
        {this.state.loading == false ?
        <>
          <MainContainer children={this.props.children} appdata={this.state.login} approleA={this.state.s_f} approleB={this.state.s_s}/>
        </>
        :
        null
        }
      </div>
    );
  }
}
