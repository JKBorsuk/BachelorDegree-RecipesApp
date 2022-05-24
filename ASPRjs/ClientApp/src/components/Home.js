import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      login: this.props.appdata,
      newest: ""
    }
  }

  componentDidMount() {
    axios.get("Dishes/Recipe/GetThreeNewest")
    .then(response => {
      this.setState({newest: response.data.recipes});
    })
  }

  render () {
    return (
      <div id="main-home-page">
        <div id="main-banner-wrapper">
          <div id="main-banner">
            <div id="main-banner-text">
              <h3>Recipe Master</h3>
              <p>Jeden by wszystkie zebrać i ludziom podarować</p>
            </div>
            <img src="/Images/taryn-elliott-4099237.jpg" alt=""/>
          </div>
        </div>
        <h3>Nie wiesz co dzisiaj ugotować?</h3>
        <p>Pozwól że pomogę Ci rozwiązać Twój problem</p>
        <div className="main-home-container-1 container">
          <div className='row'>
            <div className='col-sm-4 m-sm-auto'><h5>Cel powstania aplikacji</h5></div>
            <div className='col-sm-8'>
              <div style={{float: 'left'}}></div><div>Zaoszczędzenie Twojego czasu</div>
              <div style={{float: 'left'}}></div><div>Przy pomocy zebranych przepisów podsunąć Ci takie dania, które możesz zrobić od ręki</div>
              <div style={{float: 'left'}}></div><div>Doradzenie czego Ci brakuje w spiżarni</div>
              <div style={{float: 'left'}}></div><div>Bycie na każde Twoje wywołanie</div>
            </div>
          </div>
        </div>

        {!this.state.login?
          <div className="main-home-container-2 container">
            <div className='row'>
              <div id="main-account-offer" className='col-6 col-sm-4'>Nie masz jeszcze konta? - Załóż je</div>
              <Link to="/register" id="main-account-register" className='col-4 offset-1 col-sm-2 offset-sm-1 my-auto'>Zarejestruj się</Link>
            </div>
          </div>
          :
          null
        }

        <div className="main-home-container-1 container" style={{marginTop: '2.5em'}}>
          <div className='row'>
            <div className='col-sm-4 m-sm-auto'><h5>Wykorzystane technologie</h5></div>
            <div className='col-sm-8'>
              <div style={{float: 'left'}}></div><div>ASP.NET</div>
              <div style={{float: 'left'}}></div><div>ReactJs</div>
              <div style={{float: 'left'}}></div><div>Bootstrap</div>
            </div>
          </div>
        </div>

        <div className="main-home-container-1 container" style={{marginTop: '2.5em'}}>
          <div className='row'>
            <div className='col-sm-4 m-sm-auto'><h5>Języki programowania</h5></div>
            <div className='col-sm-8'>
              <div style={{float: 'left'}}></div><div>C#</div>
              <div style={{float: 'left'}}></div><div>JavaScript</div>
              <div style={{float: 'left'}}></div><div>HTML5</div>
            </div>
          </div>
        </div>

        <div className="main-home-container-3 container" style={{marginBottom: '5em'}}>
          <h4>Najnowsze dodane przepisy:</h4>
          <div className='row'>
            {this.state.newest.length > 0 ?
              <>
                <div className='col-sm-4'>
                  <figure>
                    <Link to={'/recipes/' + this.state.newest[0].linkName}><img className='img-fluid' src={'/Images/' + this.state.newest[0].photoFileName} alt={this.state.newest[0].name}/></Link>
                    <figcaption className='mt-2'>{this.state.newest[0].name}</figcaption>
                  </figure>
                </div>
                <div className='col-sm-4'>
                  <figure>
                    <Link to={'/recipes/' + this.state.newest[1].linkName}><img className='img-fluid' src={'/Images/' + this.state.newest[1].photoFileName} alt={this.state.newest[1].name}/></Link>
                    <figcaption className='mt-2'>{this.state.newest[1].name}</figcaption>
                  </figure>
                </div>
                <div className='col-sm-4'>
                  <figure>
                    <Link to={'/recipes/' + this.state.newest[2].linkName}><img className='img-fluid' src={'/Images/' + this.state.newest[2].photoFileName} alt={this.state.newest[2].name}/></Link>
                    <figcaption className='mt-2'>{this.state.newest[2].name}</figcaption>
                  </figure>
                </div>
              </>
              :
              null
            }
          </div>
        </div>
      </div>
      /*
        <div>Jeżeli nie masz jeszcze konta załóż je - obok przycisk</div>
        <div>Wykorzystane technologie</div>
        <div>ASP.NET, ReactJs, Bootstrap</div>
        <div>Języki programowania</div>
        <div>C#, JavaScript, CSS3, HTML5</div>


      <div>
        <h1>Hello, world!</h1>
        <p>Welcome to your new single-page application, built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        </ul>
        <p>To help you get started, we have also set up:</p>
        <ul>
          <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
          <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
          <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
        </ul>
        <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
      </div>
      */
    );
  }
}
