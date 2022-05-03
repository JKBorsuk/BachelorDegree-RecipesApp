import {Component} from 'react';
import Axios from 'axios';

export class LoginUser extends Component {
    static displayName = LoginUser.name;

    constructor(props) {
        super(props)
        this.state = {
            login: "",
            password: "",
            islogged: this.props.appdata,
        }
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        try {
            if(typeof(this.state.islogged) == 'string' && this.state.islogged.length != 0) {
                window.location.href = '/';
            }
        }
        catch(err) {
            console.log("BŁĄD")
        }
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
                console.log("Niepoprawny login lub hasło")
            })
        }
        catch(err) {
            console.log("Niepoprawny login lub hasło")
        }
    }

    render() {
        return(
            <div className='reg-container'>
                <div className='register'>
                    <form onSubmit={this.submit}>
                        <input type="text" value={this.state.login} onChange={e => this.setState({login: e.target.value})} placeholder="login" autoComplete='off'/>
                        <input type="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} placeholder="password" autoComplete='off'/>
                        <button>Zaloguj się</button>
                    </form>
                </div>
            </div>
        )
    }
}