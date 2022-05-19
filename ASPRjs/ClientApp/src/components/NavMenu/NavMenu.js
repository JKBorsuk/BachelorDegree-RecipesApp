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
      sub_load1: this.props.approleA,
      sub_load2: this.props.approleB
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  componentDidMount() {
    this.setState({loading: false})
  }

  submitSearch(e) {
    e.preventDefault();
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/" className='text-white' >Recipe Master</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-white" to="/">Strona Główna</NavLink>
                </NavItem>
                {
                  this.state.loading === false ?
                    this.state.sub_load1 === false ?
                    <>
                    <NavItem>
                      <NavLink tag={Link} className="text-white" to="/addrecipe">Dodaj przepis</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-white" to="/user-search">Podejrzyj użytkownika</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-white" to="/view-all">Wyświetl wszystkie przepisy</NavLink>
                    </NavItem>
                      {this.state.sub_load2 === false ?
                      <NavItem>
                        <NavLink tag={Link} className="text-white" to="/change-role">Zmień rolę</NavLink>
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
                    <NavLink tag={Link} className="text-white" to="/FAQ">FAQ</NavLink> 
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-white" to="/login">Zaloguj</NavLink>
                  </NavItem>
                  </>
                  :
                  <>
                  <NavItem>
                    <NavLink tag={Link} className="text-white" to="/user-panel">Panel użytkownika</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-white" to="/logout">Wyloguj</NavLink>
                  </NavItem>
                  </>
                }
              </ul>
              {this.state.login ? 
                <div id='navbar-search-module'> 
                  <input type="text" placeholder="Szukaj"/> 
                  <div>Szukaj</div>
                </div>
                :
                null
              }
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
