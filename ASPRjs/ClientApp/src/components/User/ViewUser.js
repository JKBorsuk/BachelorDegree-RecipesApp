import React, { Component } from 'react';
//import './User.css'

export class ViewUser extends Component {
    static displayName = ViewUser.name;

    constructor(props) {
        super(props);
        this.state = { 
            user: [], 
            user_login: window.location.href.substring(window.location.href.lastIndexOf('/') + 1), 
            loading: false };
    }

    componentDidMount() {
        this.WriteData();
    }

    static userRole = props => {
        switch (props) {
            case 1:
                return 'User'
            case 2:
                return 'Admin'
            case 3:
                return 'Head Admin'
        }
    }

    static renderUser(user) {
        return (
            <div>
                <div>{"Rola użytkownika: " + this.userRole(user["role"])}</div>
                <div>{"Nazwa: " + user["login"]}</div>
                    <div>
                        {(typeof (user.ingredients) == 'object') ?
                            <div>{user.ingredients.map((sub,k) =>
                                <div>
                                    <div>{"Składnik nr " + (k+1) + ": " + sub.name}</div>
                                </div>
                            )}</div>
                            :
                            null}
                    </div>
            </div>
        );
    }

    render() {

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : ViewUser.renderUser(this.state.user);

        return (
            <div>
                {this.state.user["name"] != undefined ?
                    <div>
                        <h1 id="tabelLabel" >{"Witaj " + this.state.user["name"] + "!"}</h1>
                        <p>Tutaj możesz gromadzić zapasy swojej spiżarni co umożliwi Ci przyrządzenie przepysznych dań!</p>
                        {contents}
                    </div>
                    :
                    <div>
                        <h1 id="tabelLabel" >Witaj, niestety taki użytkownik nie istnieje</h1>
                        <p>Załóż konto, aby móc wypróbować moją aplikację!</p>
                    </div>}
            </div>
        );
    }

    async WriteData() {
        try {
            const response = await fetch('Community/User/' + this.state.user_login);
            const data = await response.json();
            this.setState({ user: data, loading: false });
        }
        catch (error) {
            console.log('404 Not Found');
            this.setState({ loading: false });
        }
    }
}
