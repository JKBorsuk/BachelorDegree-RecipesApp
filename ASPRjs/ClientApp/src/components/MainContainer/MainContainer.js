import { Component } from "react";
import { Footer } from './../Footer/Footer';
import { NavMenu } from './../NavMenu/NavMenu';

export class MainContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.children,
            appdta: this.props.appdata
        }
    }

    render() {
        return(
            <div id='main-recipe-master-container'>
                <NavMenu appdata={this.state.appdta}/>
                {this.state.data}
                <Footer/>
            </div>
        )
    }
}