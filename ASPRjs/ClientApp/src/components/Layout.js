import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { MainContainer } from './MainContainer/MainContainer';

export class Layout extends Component {
  static displayName = Layout.name;

  constructor (props) {
    super(props);
    this.state = {
      login: this.props.appdata,
      loading: true
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
        <Container>
          <MainContainer children={this.props.children} appdata={this.state.login}/>
        </Container>
        </>
        :
        null
        }
      </div>
    );
  }
}
