import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';
import TreeLogo from "../../volunteer-network-resources/logos/Group 1329.png";

const NotFound = () => {
    return (
        <div className='NotFound'>
                <div className='col-sm-10 col-md-8 col-lg-6 logo_container'>
                    <Link to='/'><img className='tree_img_logo' src={TreeLogo} alt=""/></Link>
                </div>
            <h1>Sorry, Page Not Found</h1>
            <h3>404, Error!!!</h3>
        </div>
    );
};

export default NotFound;