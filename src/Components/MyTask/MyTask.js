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
                        <div class="card mb-3 card_container">
                            <div class="row no-gutters card_data d-flex align-items-center">
                                <div class=" col-md-5">
                                    <img src={taskData.img_link} class="card-img" alt="..." />
                                </div>
                                <div class="col-md-7">
                                    <div class="card-body">
                                        <h4 class="card-title">{taskData.title}</h4>
                                        <p class="card-text">little bit longer.</p>
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