import React, { useEffect, useState } from 'react';
import './Home.css';
import { UserContext } from '../../App';
import { useContext } from 'react';
import Card from '../Card/Cards';

const Home = () => {
    const [loggedInUser, setLoggedInUser, selectedTask, setSelectedTask] = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const handleSelectedTask = task => {
        setSelectedTask(task);
    }
    const colors = ['#FFBD3E', '#FF7044', '#3F90FC', '#421FCF'];
    let colorIndex = 0
    const handleColorIndex = () => colorIndex > 2 ?  colorIndex = 0 :  colorIndex = colorIndex + 1;

    useEffect(() => {
        fetch('http://localhost:4200/alltasks')
        .then(res => res.json())
        .then(data => setTasks(data))
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
                    tasks.map(task =><Card key={task._id} colors={colors} handleColorIndex={handleColorIndex} handleSelectedTask={handleSelectedTask} task={task}></Card>)
                }
            </div>
        </div>
    );
};

export default Home;