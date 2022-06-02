import { Component } from "react";
import './contact.css';

export class Contact extends Component {
    static displayName = Contact.name;

    constructor(props) {
        super(props);
        this.state = {
            login: this.props.appdata,
            AdminMessage: "",
            userMessage: ""
        }
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(event) {
        event.preventDefault();
        if((String)(this.state.AdminMessage).length >= 500) this.setState({userMessage: "Maksymalna długość wiadomości to 500 znaków"})
    }
    
    render() {
        return(
            <>
                <div id='contact-admin-container'>
                    <h2 style={{margin: '0.5em auto 0 auto', width: 'fit-content', padding: '0.5em 0'}}>Cześć! Co chcesz do mnie napisać?</h2>
                    <form onSubmit={this.submitForm}>
                        <div id="contact-textarea-wrap"><textarea style={{top: '0', left: '0', position: 'absolute', width: '100%', height: '100%', backgroundColor: '#292b2c', color: 'white', padding: '1em'}} value={this.state.AdminMessage} onChange={(e) => this.setState({AdminMessage: e.target.value})}/></div>
                        <button>Wyślij</button>
                    </form>
                </div>
                {this.state.userMessage ?
                    <div id='ErrorMessage-container' onClick={() => this.setState({userMessage: ""})}>
                        <div id="ErrorMessage">{this.state.userMessage}</div>
                    </div>
                    :
                    null
                }
            </>
        )
    }
}