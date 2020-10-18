import React, { useContext, useEffect, useState } from 'react';
import './Mytask.css';
import { UserContext } from '../../App';


const MyTask = () => {
    const [myTask, setMyTask] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo){
        fetch(`https://immense-spire-11805.herokuapp.com/register-user?email=${userInfo.email}`,{
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json'
            ,"authorization" : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setMyTask(data))
    }
  },[]);

//cancel
const handleCancel = id =>{
    console.log(id);
    fetch(`https://immense-spire-11805.herokuapp.com/delete/${id}`, {
        method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
          if (data) {
            alert('Your Task Canceled');
            afterDeleteDataLoad();
          }
      });

}

const afterDeleteDataLoad = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo){
        fetch(`https://immense-spire-11805.herokuapp.com/register-user?email=${userInfo.email}`,{
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json'
            ,"authorization" : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setMyTask(data));
    }

  }
    return (
        <div className='myTasks_container'>
            <div className="container allCard_container">
                <div className='row card-row '>
                {
                    myTask.length > 0  &&
                  <>
                     {myTask[0].registerData && typeof(myTask[0].registerData) !== undefined &&
                        myTask.map(taskData => 
                        <div className="card mb-3 card_container">
                            <div className="row no-gutters card_data d-flex align-items-center">
                                <div className=" col-md-5">
                                    <img src={taskData.registerData.img_link} class="card-img" alt="..." />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h4 className="card-title">{taskData.registerData.title}</h4>
                                        <h6 className="card-text">Date: {(new Date(taskData.registerData.date).toDateString('dd/MM/yyyy'))}</h6>
                                        <button onClick={() =>handleCancel(taskData._id)} className='ml-auto btn btn-primary'>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                  </>
                }
                </div>
            </div>
        </div>
    );
};

export default MyTask;