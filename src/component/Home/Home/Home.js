import React from 'react';
import Blogs from '../Blogs/Blogs'
import Footer from '../Footer/Footer';
import Header from '../Header/Header'
const Home = () => {
    return (
        <div>
            <Header />
            <Blogs/>
            <Footer/>
        </div>
    );
};

export default Home;