import React from 'react';
import './Home.css';

import AllCardContainer from '../AllCardContainer/AllCardContainer';

const Home = () => {

    return (
        <div className="container">
            <div className='search_area'>
                <h1>I grow by helping people in need.</h1>
                <div className="input-group mb-3">
                    <input type="search" className="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" id="button-addon2">Button</button>
                    </div>
                </div>
            </div>
            <AllCardContainer/>
        </div>
    );
};

export default Home;