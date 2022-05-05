import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      login: this.props.appdata,
      loading: true,
      sub_load1: true,
      sub_load2: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  isAdmin() {
    if(typeof(this.state.login) == 'string' && this.state.login.length == 0) { this.setState({sub_load1: true}); return }
    Axios.get("Community/User/IsAdmin/" + this.state.login)
    .then(resp => {
      if(resp.status == 200) { this.setState({sub_load1: false}) }
      else if(resp.status == 204) this.setState({sub_load1: true})
    })
    .catch((er) => {
      console.log(er)
      this.setState({sub_load1: true})
    })
  }

  isHeadAdmin() {
    if(typeof(this.state.login) == 'string' && this.state.login.length == 0) { this.setState({sub_load2: true}); return }
    Axios.get("Community/User/IsHeadAdmin/" + this.state.login)
    .then(resp => {
      if(resp.status == 200) { this.setState({sub_load2: false}) }
      else if(resp.status == 204) this.setState({sub_load2: true})
    })
    .catch((er) => {
      console.log(er)
      this.setState({sub_load2: true})
    })
  }

  componentDidMount() {
    this.setState({loading: false})
    this.isAdmin();
    this.isHeadAdmin();
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Recipe Master</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                {
                  this.state.loading === false ?
                    this.state.sub_load1 === false ?
                    <>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/addrecipe">Add Recipe</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/user-search">View User</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/view-all">View All</NavLink>
                    </NavItem>
                      {this.state.sub_load2 === false ?
                      <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/change-role">Change Role</NavLink>
                      </NavItem>
                      :
                      null
                      }
                    </>
                    :
                    null
                  :
                  null
                }
                {!this.state.login ?
                  <>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/register">Register</NavLink>
                  </NavItem>
                  </>
                  :
                  <>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/user-panel">User Panel</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/logout">Logout</NavLink>
                  </NavItem>
                  </>
                }
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
