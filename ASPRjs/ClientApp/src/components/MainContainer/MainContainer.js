import { Component } from "react";
import { Footer } from './../Footer/Footer';
import { NavMenu } from './../NavMenu/NavMenu';
import { Container } from 'reactstrap';

export class MainContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.children,
            appdta: this.props.appdata,
            s_f: this.props.approleA,
            s_s: this.props.approleB
        }
    }

    render() {
        return(
            <div id='main-recipe-master-container'>
                <NavMenu appdata={this.state.appdta} approleA={this.state.s_f} approleB={this.state.s_s}/>
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