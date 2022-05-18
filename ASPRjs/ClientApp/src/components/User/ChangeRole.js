import axios from "axios";
import { Component } from "react";

export class ChangeRole extends Component {
    static displayName = ChangeRole.name;

    constructor(props) {
        super(props)
        this.state = {
            login: this.props.appdata,
            user_login: "",
            new_user_role: "",
        }
    }

    submit(e) {
        e.preventDefault();
        axios.put("Community/User/ChangeRole/" + this.state.user_login + "/" + this.state.new_user_role)
        .then(resp => 
            console.log(resp)
        )
        .catch((err) => {console.log(err.response.data)});
        
    }

    render() {
        return(
            <div className="reg-container">
                <div className="register">
                    <form onSubmit={(e) => this.submit(e)}>
                        <input
                            type="text"
                            id="name"
                            value={this.state.user_login}
                            placeholder="user login"
                            autoComplete="off"
                            onChange={(e) => this.setState({user_login: e.target.value})}
                        />
                        <input
                            type="text"
                            id="login"
                            value={this.state.new_user_role}
                            placeholder="user new role"
                            autoComplete="off"
                            onChange={(e) => this.setState({new_user_role: e.target.value})}
                        />
                        <button>Zmień</button>
                    </form>
                </div>
            </div>
        )
    }
}