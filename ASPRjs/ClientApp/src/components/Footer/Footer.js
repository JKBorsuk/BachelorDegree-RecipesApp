import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export class Footer extends Component {
    static displayName = Footer.name;

    render() {
        return (
            <>
            <footer className='bg-dark text-white'>
                <div className='footer-c container mb-3'>
                    <div className='row my-auto'>
                        <div className='col-3'><a href='https://wzim.sggw.edu.pl/'><div className='icon-address-book-o'/>Uczelnia</a></div>
                        <div className='col-3'><a href='https://www.linkedin.com/in/jakub-borsuk-278179236/'><div className='icon-linkedin-squared'/>LinkedIn</a></div>
                        <div className='col-3'><a href='https://github.com/JKBorsuk'><div className='icon-github-circled'/>GitHub</a></div>
                        <div className='col-3'><Link to='/contact'><div className='icon-comment'/>Kontakt</Link></div>
                    </div>
                </div>
                <div>Stworzone i zaprojektowane przez Jakub Borsuk, Copyright © 2022, Wszelkie prawa zastrzeżone.</div>
            </footer>
            </>
        )
    }
}