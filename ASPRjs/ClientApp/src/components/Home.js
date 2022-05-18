import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div id="main-home-page">
        <div id="main-banner">
          <div id="main-banner-text">
            <h3>Recipe Master</h3>
            <p>Jeden by wszystkie zebrać i ludziom podarować</p>
          </div>
          <img src="./Images/taryn-elliott-4099237.jpg" alt="" />
        </div>
        <h3>Nie wiesz co dzisiaj ugotować?</h3>
        <p>Pozwól że pomogę Ci rozwiązać Twój problem</p>
        <div id="main-home-container-1" className='container'>
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

        <div id="main-home-container-2" className='container'>
          <div className='row'>
            <div id="main-account-offer" className='col-sm-4'>Nie masz jeszcze konta? - Załóż je</div>
            <Link to="/register" id="main-account-register" className='col-sm-2 offset-sm-1 my-auto'>Zarejestruj się</Link>
          </div>
        </div>

        <div id="main-home-container-1" style={{marginTop: '2.5em'}} className='container'>
          <div className='row'>
            <div className='col-sm-4 m-sm-auto'><h5>Wykorzystane technologie</h5></div>
            <div className='col-sm-8'>
              <div style={{float: 'left'}}></div><div>ASP.NET</div>
              <div style={{float: 'left'}}></div><div>ReactJs</div>
              <div style={{float: 'left'}}></div><div>Bootstrap</div>
            </div>
          </div>
        </div>

        <div id="main-home-container-1" style={{marginTop: '2.5em', marginBottom: '6em'}} className='container'>
          <div className='row'>
            <div className='col-sm-4 m-sm-auto'><h5>Języki programowania</h5></div>
            <div className='col-sm-8'>
              <div style={{float: 'left'}}></div><div>C#</div>
              <div style={{float: 'left'}}></div><div>JavaScript</div>
              <div style={{float: 'left'}}></div><div>HTML5</div>
            </div>
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
