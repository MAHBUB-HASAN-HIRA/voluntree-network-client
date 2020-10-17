import React, { useState } from 'react';
import './Mytask.css';
import fakeData from './../fakeData/fakeData.json';


const MyTask = () => {

    const [myTask, setMyTask] = useState(fakeData.slice(0, 6));

    return (
        <div className='myTasks_container'>
            <div className="container allCard_container">
                <div className='row card-row '>
                {
                    myTask.map(taskData => 
                        <div className="card mb-3 card_container">
                            <div className="row no-gutters card_data d-flex align-items-center">
                                <div className=" col-md-5">
                                    <img src={taskData.img_link} class="card-img" alt="..." />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h4 className="card-title">{taskData.title}</h4>
                                        <p className="card-text">little bit longer.</p>
                                        <button className='ml-auto btn btn-primary'>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    );
};

export default MyTask;