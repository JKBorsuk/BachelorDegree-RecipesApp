import {Component} from 'react';
import Axios from 'axios';

export class Logout extends Component {
    static displayName = Logout.name;


    componentDidMount() {
        try {
            Axios.get("Community/User/Logout")
            .then((resp) => {
                window.location.href = '/';
            })
            .catch(() => {})
        }
        catch(err) {
            
        }
      }

    render() {
        return(
            <div></div>
        )
    }
}