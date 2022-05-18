import {Component} from 'react';
import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
import Axios from 'axios';

export class LoginUser extends Component {
    static displayName = LoginUser.name;

    constructor(props) {
        super(props)
        this.state = {
            login: "",
            password: "",
            islogged: this.props.appdata,
            message: ""
        }
        this.submit = this.submit.bind(this);
        this.hideMessage_L = this.hideMessage_L.bind(this);
    }

    submit(e) {
        e.preventDefault();
        try {
            Axios.post("Community/User/Login", {
                login: this.state.login,
                password: this.state.password
            })
            .then(() => {
                window.location.href = '/';
            })
            .catch(() => {
                this.setState({message: "Niepoprawny login lub hasło"})
            })
        }
        catch(err) {
            this.setState({message: "Niepoprawny login lub hasło"})
        }
    }

    hideMessage_L() {
        this.setState({message: ""})
    }

    render() {
        return(
            <>
            <div className='reg-container'>
                <div className='register'>
                <div className='display-6' style={{letterSpacing: '1px', marginBottom: '1em', userSelect: 'none'}}>Login</div>
                    <form onSubmit={this.submit}>
                        <input type="text" value={this.state.login} onChange={e => this.setState({login: e.target.value})} placeholder="login" autoComplete='off'/>
                        <input type="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} placeholder="password" autoComplete='off'/>
                        <button>Zaloguj się</button>
                    </form>
                    <div id='register-suggestion'>
                        <div>Nie masz jeszcze konta?</div>
                        <Link to="/register" id="rsuggestion-redirect">Zarejestruj się</Link>
                    </div>
                </div>
            </div>
            {this.state.message ?
                <div id='ErrorMessage-container' onClick={this.hideMessage_L}>
                    <div id="ErrorMessage">{this.state.message}</div>
                </div>
                :
                null
            }
            </>
        )
    }
}