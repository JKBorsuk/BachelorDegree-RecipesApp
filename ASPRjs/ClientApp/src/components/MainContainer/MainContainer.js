import { Component } from "react";
import { Footer } from './../Footer/Footer';
import { NavMenu } from './../NavMenu/NavMenu';
import { Container } from 'reactstrap';
import axios from 'axios';

export class MainContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.children,
            appdta: this.props.appdata,
            s_f: this.props.approleA,
            s_s: this.props.approleB,
            adminMessage: "",
            adminMessages: [],
            adminMessagesShow: false
        }
    }

    componentDidMount(){
        axios.get("Community/User/GetMessages").then(resp => resp.data.count > 0? this.setState({adminMessage: "Masz wiadomości", adminMessages: resp.data.messages}) : null)
    }

    showMessages() {
        this.setState({
            adminMessagesShow: true, 
            adminMessage: ""
        })
    }

    render() {
        return(
            <div id='main-recipe-master-container'>
                <NavMenu appdata={this.state.appdta} approleA={this.state.s_f} approleB={this.state.s_s}/>
                {this.state.adminMessage? 
                    <div id="admin-messages-alert" onClick={() => this.showMessages()}>
                        {this.state.adminMessage}
                    </div>
                    : null 
                }
                {this.state.adminMessagesShow === true?
                    <div id="admin-messages-all">
                        <div id="admin-messages-close" onClick={() => this.setState({adminMessagesShow: false})}>{'\u2715'}</div>
                        <div id="admin-message-deleteAll" onClick={() => axios.delete("Community/User/Messages").then(() => {this.setState({adminMessagesShow: false})})}>Delete all</div>
                        <div id="admin-messages-container">
                            {(typeof(this.state.adminMessages)) == 'object' && this.state.adminMessages.length > 0?
                            this.state.adminMessages.map(el =>
                                <div className="admin-message-wrap" key={el.userLogin}>
                                    <div>{'Od: ' + el.userLogin}</div>
                                    <div className="admin-message-message">{el.userMessage}</div>
                                </div>
                            )
                            :
                            null
                            }
                        </div>
                    </div>
                    :
                    null
                }
                <div id="main-recipe-background">
                    <Container>
                        {this.state.data}
                    </Container>
                </div>
                <Footer/>
            </div>
        )
    }
}