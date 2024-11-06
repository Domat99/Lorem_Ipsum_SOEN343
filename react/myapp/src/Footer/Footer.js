import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-links'>
                <Link to='/contact'>Contact Us</Link>
                <Link to="/infopages/faq">FAQ</Link>
                <Link to='/tracking'>Track Your Package</Link>
                <Link to='/infopages/policy'>Policy</Link>

            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <Link to='/' className='social-logo'>
                        <img src="/Images/logo.png" alt="Pigeon Express Logo" className="footer-logo"/>
                    </Link>
                    <small className='website-rights'>Pigeon Express © {new Date().getFullYear()}</small>
                    <div className='social-icons'>
                        <Link className='social-icon-link facebook' to='/' target='_blank' aria-label='Facebook'>
                            <i className='fab fa-facebook-f'/>
                        </Link>
                        <Link className='social-icon-link instagram' to='/' target='_blank' aria-label='Instagram'>
                            <i className='fab fa-instagram'/>
                        </Link>
                        <Link className='social-icon-link youtube' to='/' target='_blank' aria-label='YouTube'>
                            <i className='fab fa-youtube'/>
                        </Link>
                        <Link className='social-icon-link twitter' to='/' target='_blank' aria-label='Twitter'>
                            <i className='fa-brands fa-x-twitter'/>
                        </Link>
                        <Link className='social-icon-link linkedin' to='/' target='_blank' aria-label='LinkedIn'>
                            <i className='fab fa-linkedin'/>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer;
