import React, { Component } from 'react';
import { Collapse, Container, DropdownItem, DropdownMenu, DropdownToggle, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { Dropdown } from 'bootstrap';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      login: this.props.appdata,
      sub_load1: this.props.approleA,
      sub_load2: this.props.approleB
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  submitSearch(e) {
    e.preventDefault();
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-md navbar-toggleable-md navbar-dark bg-dark border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/" className='text-white' >Recipe Master</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-md-inline-flex flex-md-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-white-Hoverable" to="/">Strona Główna</NavLink>
                </NavItem>
                {this.state.sub_load1 === false && this.state.sub_load2 === true ?
                  <NavItem>
                    <NavLink tag={Link} className="text-white-Hoverable" to="/addrecipe">Dodaj przepis</NavLink>
                  </NavItem>
                  :
                  null
                }
                {this.state.sub_load1 === false && this.state.sub_load2 === false ?
                  <>
                    <NavItem>
                      <NavLink tag={Link} className="text-white-Hoverable" to="/addrecipe">Dodaj przepis</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-white-Hoverable" to="/change-role">Zmień rolę</NavLink>
                    </NavItem>
                  </>
                  :
                  null
                }
                {!this.state.login ?
                  <>
                  <NavItem>
                    <NavLink tag={Link} className="text-white-Hoverable" to="/FAQ">FAQ</NavLink> 
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-white-Hoverable" to="/login">Zaloguj</NavLink>
                  </NavItem>
                  </>
                  :
                  <>
                  <NavItem>
                    <NavLink tag={Link} className="text-white-Hoverable" to="/user-panel">Panel użytkownika</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-white-Hoverable" to="/logout">Wyloguj</NavLink>
                  </NavItem>
                  </>
                }
              </ul>
              <div id='navbar-search-module' className='mr-2'> 
                <input type="text" placeholder="Szukaj"/> 
                <div>Szukaj</div>
              </div>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
