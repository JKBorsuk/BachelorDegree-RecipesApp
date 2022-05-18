import React, { Component } from 'react';
import './Footer.css';

export class Footer extends Component {
    static displayName = Footer.name;

    render() {
        return (
            <>
            <div id="footer-filler"></div>
            <footer className='bg-dark text-white'>
                <div>Stworzone przez Jakub Borsuk, Copyright © 2022, Wszelkie prawa zastrzeżone.</div>
            </footer>
            </>
        )
    }
}