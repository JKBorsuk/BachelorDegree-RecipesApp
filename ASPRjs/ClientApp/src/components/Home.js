import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      login: this.props.appdata,
      newest: [],
      bestR: [],
      popularR: [],
      smallestR: [],
      fullyLoaded: false
    }
  }

  componentDidMount() {
    axios.get("Dishes/Recipe/GetThree")
    .then(response => {
      this.setState({
        bestR: response.data[0].recipes,
        popularR: response.data[1].recipes,
        newest: response.data[2].recipes, 
        smallestR: response.data[3].recipes,
        fullyLoaded: true
      });
    })
  }

  render () {
    return (
      this.state.fullyLoaded ?
        <div id="main-home-page">
          <div id="main-banner-wrapper">
            <div id="main-banner">
              <div id="main-banner-text">
                <h3 style={{padding: '0 1em'}}>Recipe Master</h3>
              </div>
              <img src="/Images/taryn-elliott-4099237.jpg" alt=""/>
            </div>
          </div>
          <h3>Nie wiesz co dzisiaj ugotować?</h3>
          <p>Pozwól że pomogę Ci rozwiązać Twój problem</p>

          <div id="main-home-container-wrapper">
            {this.state.bestR.length > 0 ?
              <div className="main-home-container-3 container" style={{marginBottom: '2.5em'}}>
                <h4>Najwyżej oceniane przepisy:</h4>
                <div className='row'>
                      <div className='col-sm-12 col-md-4'>
                        <figure>
                          <Link to={'/recipes/' + this.state.bestR[0].linkName}><img className='img-fluid' src={'/Images/' + this.state.bestR[0].photoFileName} alt={this.state.bestR[0].name}/></Link>
                        </figure>
                        <figcaption className='mt-2'>{this.state.bestR[0].name}</figcaption>
                      </div>
                      <div className='col-sm-6 col-md-4'>
                        <figure>
                          <Link to={'/recipes/' + this.state.bestR[1].linkName}><img className='img-fluid' src={'/Images/' + this.state.bestR[1].photoFileName} alt={this.state.bestR[1].name}/></Link>
                        </figure>
                        <figcaption className='mt-2'>{this.state.bestR[1].name}</figcaption>
                      </div>
                      <div className='col-sm-6 col-md-4'>
                        <figure>
                          <Link to={'/recipes/' + this.state.bestR[2].linkName}><img className='img-fluid' src={'/Images/' + this.state.bestR[2].photoFileName} alt={this.state.bestR[2].name}/></Link>
                        </figure>
                        <figcaption className='mt-2'>{this.state.bestR[2].name}</figcaption>
                      </div>
                </div>
              </div>
              :
              null
            }

            {this.state.popularR.length > 0 ?
              <div className="main-home-container-3 container" style={{marginBottom: '2.5em'}}>
                <h4>Najczęściej wyświetlane:</h4>
                <div className='row'>
                      <div className='col-sm-12 col-md-4'>
                        <figure>
                          <Link to={'/recipes/' + this.state.popularR[0].linkName}><img className='img-fluid' src={'/Images/' + this.state.popularR[0].photoFileName} alt={this.state.popularR[0].name}/></Link>
                        </figure>
                        <figcaption className='mt-2'>{this.state.popularR[0].name}</figcaption>
                      </div>
                      <div className='col-sm-6 col-md-4'>
                        <figure>
                          <Link to={'/recipes/' + this.state.popularR[1].linkName}><img className='img-fluid' src={'/Images/' + this.state.popularR[1].photoFileName} alt={this.state.popularR[1].name}/></Link>
                        </figure>
                        <figcaption className='mt-2'>{this.state.popularR[1].name}</figcaption>
                      </div>
                      <div className='col-sm-6 col-md-4'>
                        <figure>
                          <Link to={'/recipes/' + this.state.popularR[2].linkName}><img className='img-fluid' src={'/Images/' + this.state.popularR[2].photoFileName} alt={this.state.popularR[2].name}/></Link>
                        </figure>
                        <figcaption className='mt-2'>{this.state.popularR[2].name}</figcaption>
                      </div>
                </div>
              </div>
              :
              null
            }

            {this.state.newest.length > 0 ?
              <div className="main-home-container-3 container" style={{marginBottom: '2.5em'}}>
                <h4>Najnowsze przepisy:</h4>
                <div className='row'>
                      <div className='col-sm-12 col-md-4'>
                        <figure>
                          <Link to={'/recipes/' + this.state.newest[0].linkName}><img className='img-fluid' src={'/Images/' + this.state.newest[0].photoFileName} alt={this.state.newest[0].name}/></Link>
                        </figure>
                        <figcaption className='mt-2'>{this.state.newest[0].name}</figcaption>
                      </div>
                      <div className='col-sm-6 col-md-4'>
                        <figure>
                          <Link to={'/recipes/' + this.state.newest[1].linkName}><img className='img-fluid' src={'/Images/' + this.state.newest[1].photoFileName} alt={this.state.newest[1].name}/></Link>
                        </figure>
                        <figcaption className='mt-2'>{this.state.newest[1].name}</figcaption>
                      </div>
                      <div className='col-sm-6 col-md-4'>
                        <figure>
                          <Link to={'/recipes/' + this.state.newest[2].linkName}><img className='img-fluid' src={'/Images/' + this.state.newest[2].photoFileName} alt={this.state.newest[2].name}/></Link>
                        </figure>
                        <figcaption className='mt-2'>{this.state.newest[2].name}</figcaption>
                      </div>
                </div>
              </div>
              :
              null
            }

            {this.state.smallestR.length > 0 ?
              <div className="main-home-container-3 container" style={{marginBottom: '5em'}}>
                <h4>Mające najmniej składników:</h4>
                <div className='row'>
                      <div className='col-sm-12 col-md-4'>
                        <figure>
                          <Link to={'/recipes/' + this.state.smallestR[0].linkName}><img className='img-fluid' src={'/Images/' + this.state.smallestR[0].photoFileName} alt={this.state.smallestR[0].name}/></Link>
                        </figure>
                        <figcaption className='mt-2'>{this.state.smallestR[0].name}</figcaption>
                      </div>
                      <div className='col-sm-6 col-md-4'>
                        <figure>
                          <Link to={'/recipes/' + this.state.smallestR[1].linkName}><img className='img-fluid' src={'/Images/' + this.state.smallestR[1].photoFileName} alt={this.state.smallestR[1].name}/></Link>
                        </figure>
                        <figcaption className='mt-2'>{this.state.smallestR[1].name}</figcaption>
                      </div>
                      <div className='col-sm-6 col-md-4'>
                        <figure>
                          <Link to={'/recipes/' + this.state.smallestR[2].linkName}><img className='img-fluid' src={'/Images/' + this.state.smallestR[2].photoFileName} alt={this.state.smallestR[2].name}/></Link>
                        </figure>
                        <figcaption className='mt-2'>{this.state.smallestR[2].name}</figcaption>
                      </div>
                </div>
              </div>
              :
              null
            }
          </div>
          {!this.state.login?
            <div className='main-home-container-2 container'>
              <div className='row'>
                <div id="main-account-offer" className='col-12 col-lg-4 offset-lg-4 my-lg-auto'><h6>Chciałbyś dostać dopasowane pod siebie przepisy?</h6></div>
                <Link to="/register" id="main-account-register" className='col-12 my-4 mx-auto col-lg-4 mx-lg-1 my-lg-auto'>Zarejestruj się</Link>
              </div>
            </div>
            :
            null
          }
        </div>
        :
        <div id="reg-loading--l">
            <div className="user-panel-loading-signature"><div className='RMasterloader'/></div>
        </div>

      
      /*
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
