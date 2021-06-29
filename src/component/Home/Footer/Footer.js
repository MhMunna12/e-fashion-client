  
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';
const Footer = () => {
    return (
            <div className="e-footer">
                <div className = 'mt-5 text-center'>
                    <h4>&copy; {(new Date()).getFullYear()} Design Monwar Hossain</h4>
                </div>
            </div>
    );
};

export default Footer;