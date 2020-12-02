import React, { useContext, useEffect, useState } from 'react';
import Card from '../Card/Cards';
import './AllCardContainer.css';
import { UserContext } from '../../App';
import loading from '../../volunteer-network-resources/loading.gif';

const AllCardContainer = () => {

    const [, , , setSelectedTask] = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const handleSelectedTask = task => {
        setSelectedTask(task);
        sessionStorage.setItem('task', JSON.stringify(task));
    }
    const colors = ['#FFBD3E', '#FF7044', '#3F90FC', '#421FCF'];
    let colorIndex = 0;
    const handleColorIndex = () => colorIndex > 2 ?  colorIndex = 0 :  colorIndex = colorIndex + 1;

    useEffect(() => {
        fetch('https://voluntree-network-101.herokuapp.com/alltasks')
        .then(res => res.json())
        .then(data => setTasks(data))
    }, [])
    return (
        <div className='card_contain'>
            { tasks.length > 0 ?
                tasks.map(task =><Card key={task._id} colors={colors} handleColorIndex={handleColorIndex} handleSelectedTask={handleSelectedTask} task={task}></Card>)
                :
                <img className='d-block ml-auto mr-auto' src={loading} alt=""/>         
            }
        </div>
    );
};

export default AllCardContainer;