import React, { useContext, useEffect, useState } from 'react';
import './Mytask.css';
import { UserContext } from '../../App';


const MyTask = () => {
    const [myTask, setMyTask] = useState([]);
    const [loggedInUser] = useContext(UserContext);
    


//cancel
const handleCancel = id =>{
    const email = loggedInUser.email;
    fetch(`https://voluntree-network-101.herokuapp.com/delete/${id}`, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body:JSON.stringify({email})
    })
      .then(res => res.json())
      .then(data => {
          if (data) {
            alert('Volunteer SuccessFully Deleted')
            window.location.reload();
          }
      });
};


useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if(userInfo){
        fetch(`https://voluntree-network-101.herokuapp.com/register-user?email=${userInfo.email}`,{
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                "authorization" : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setMyTask(data))
    }
  },[]);


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
                                        <button onClick={() =>handleCancel(taskData._id)} className='btn btn-primary'>Cancel</button>
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