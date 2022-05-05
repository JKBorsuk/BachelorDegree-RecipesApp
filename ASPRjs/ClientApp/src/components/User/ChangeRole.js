import { Component } from "react";

export class ChangeRole extends Component {
    static displayName = ChangeRole.name;

    constructor(props) {
        super(props)
        this.state = {
            login: this.props.appdata
        }
    }

    componentDidMount() {

    }

    render() {
        return(<div>Coś</div>)
    }
}