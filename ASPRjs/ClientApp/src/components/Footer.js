import React, { Component } from 'react';
import './Footer.css';

export class Footer extends Component {
    static displayName = Footer.name;

    render() {
        return (
            <footer>
                <div>Created by Jakub Borsuk, Copyright © 2022, All rights reserved.</div>
            </footer>
        );
    }
}