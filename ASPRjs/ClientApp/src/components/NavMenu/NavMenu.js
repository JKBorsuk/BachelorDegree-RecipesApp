import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import axios from 'axios';
import $ from 'jquery';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      login: this.props.appdata,
      sub_load1: this.props.approleA,
      sub_load2: this.props.approleB,
      search: "",
      recipes: [],
      subPageRecipes: [],
      subPagesCount: 0,
      actIndex: 0,
      message: ""
    };
    this.recipeSearch = this.recipeSearch.bind(this);
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  recipeSearch(e) {
    e.preventDefault();

    if((String)(this.state.search).length <= 1) return;

    axios.get("Dishes/Recipe/search/" + this.state.search)
    .then((resp) => {
      let subpages = 0;
      if(resp.data.recipes.length % 5 != 0) subpages = Math.floor(resp.data.recipes.length/5) + 1;
      else subpages = resp.data.recipes.length / 5;
      this.setState({recipes: resp.data.recipes, subPagesCount: subpages, actIndex: 0})
    })
    .catch((err) => {})
    .finally(() => {
      this.setState({subPageRecipes: []})
      for(let i = 0; i < this.state.subPagesCount; i++) {
        let array = [];
        for(let j = i*5; j < (i+1)*5; j++) {
          if(j == this.state.recipes.length) break;
          array = [...array, this.state.recipes[j]];
        }
        this.setState({
          subPageRecipes: [...this.state.subPageRecipes, array]
        })
      }
      this.setState({search: ""})
      $('#recipe-search-container').removeClass("search-container-up").addClass("search-container-down");
      $('#recipe-search-animC').removeClass("animC-up").addClass("animC-down");
    })
  }
  closeSearch(){
    $('#recipe-search-animC').removeClass("animC-down").addClass("animC-up");
    setTimeout(function(){
      $('#recipe-search-container').removeClass("search-container-down").addClass("search-container-up");
    },600)
  }

  changeSubIndex(e) {
    document.querySelector('#main-recipe-master-container').scrollIntoView({behavior: 'smooth'})
    this.setState({actIndex: e})
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-lg navbar-toggleable-lg navbar-dark bg-dark border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/" className='text-white' >Recipe Master</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-lg-inline-flex flex-lg-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-white-Hoverable" to="/">Strona Główna</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-white-Hoverable" to="/FAQ">FAQ</NavLink> 
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-white-Hoverable" to="/About">About</NavLink> 
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
              {this.state.login?
              <form id='navbar-search-module' className='mr-2' onSubmit={this.recipeSearch}>
                <input type="text" placeholder="Szukaj" value={this.state.search} onChange={(event) => this.setState({search: event.target.value})}/> 
                <button>Szukaj</button>
              </form>
              :
              null
              }
            </Collapse>
          </Container>
        </Navbar>
        <div id="recipe-search-container">
          <div id="recipe-search-animC">
            <div id="recipe-search-exit" onClick={() => this.closeSearch()}>{'\u2715'}</div>
            <div id="recipe-search-text" style={{textAlign: 'center', marginTop: '2em'}}><h4>Wyniki wyszukiwania:</h4></div>
            <div id="recipe-search-pages">
              <div id="recipe-search-flex">
              {(Number)(this.state.subPagesCount) > 0?
                [...Array(this.state.subPagesCount)].map((e, i) =>
                    this.state.actIndex === i? 
                      <div key={i} className='recipe-sub-page' onClick={() => this.changeSubIndex(i)} style={{color: 'rgb(255, 214, 139)', cursor: 'default'}}>
                        {i+1}
                      </div>
                      :
                      <div key={i} className='recipe-sub-page' onClick={() => this.changeSubIndex(i)}>
                        {i+1}
                      </div>
                )
                :
                null
              }
              </div>
            </div>
            <div id="recipe-search-module" style={{textAlign: 'center', marginTop: '2em'}}>
              {(typeof(this.state.subPageRecipes)) == 'object' && this.state.recipes.length > 0?
                this.state.subPageRecipes.map((el, index) =>
                  (typeof(el)) == 'object' && el.length > 0 && index === this.state.actIndex?
                    el.map(sk =>
                      <div key={sk.name} className="r-search-recipe-module">
                        <a href={'./recipes/' + sk.linkName}>{sk.name}</a>
                      </div>
                    )
                    :
                    null
                )
                :
                <div style={{marginBottom: '2.5em'}}>Nie znaleziono</div>
              }
            </div>
          </div>
        </div>
      </header>
    );
  }
}
