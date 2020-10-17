import React, { useEffect, useState } from 'react';
import './Home.css';
import fakeData from './../fakeData/fakeData.json';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { UserContext } from '../../App';
import { useContext } from 'react';

const Home = () => {
    const [loggedInUser, setLoggedInUser, selectedTask, setSelectedTask] = useContext(UserContext);
    const [tasks, setTasks] = useState([]);

    const handleSelectedTask = task => {
        setSelectedTask(task);
    }

    useEffect(() => {
        setTasks(fakeData);
    }, [])

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
            <div>
                { tasks &&
                    tasks.map(task =>
                        <Link to='/register'>
                            <Card onClick={() => handleSelectedTask(task)}className='custom_card'>
                                <Card.Img className='card_img' variant="top" src={task.img_link}/>
                                <Card.Body>
                                <Card.Title>{task.title}</Card.Title>
                                </Card.Body>
                            </Card> 
                        </Link>)
                }
            </div>
        </div>
    );
};

export default Home;