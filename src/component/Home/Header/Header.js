import React from 'react';
import './Header.css';
import BgImage from '../../../images/bg-1.jpg'
import BgImages from '../../../images/g-2.jpg'
const Header = () => {
    return (
        <div className=''>
            
            <img className="img-fluid" src={BgImages} alt="" style={{height:'300px',width:'100%'}} />
        </div>
    );
};

export default Header;