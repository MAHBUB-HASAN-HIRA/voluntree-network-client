import React, { useContext, useEffect, useState } from "react";
import "./Admin.css";
import TreeLogo from "../../volunteer-network-resources/logos/Group 1329.png";
import deleteLogo from "../../volunteer-network-resources/logos/trash-2 9.png";
import { Link } from "react-router-dom";
import userLogo from "../../volunteer-network-resources/logos/users-alt 1.png"
import plusLogo from "../../volunteer-network-resources/logos/plus 1.png";
import { enGB } from 'date-fns/locale';
import { DatePicker } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import FileBase64 from 'react-file-base64';
import { UserContext } from "../../App";

const Admin = () => {
  const [loggedInUser] = useContext(UserContext);
  const [date, setDate] = useState(new Date());
  const [registeredToggled, setRegisteredToggled] = useState(true);
  const [formData, setFormData] = useState({});
  const [registerList, setRegisterList] = useState([]);
  const [image, setImage] = useState('')
  const token = sessionStorage.getItem('token');

  const handleBlur = e => {
    const newForm = {...formData}
    newForm[e.target.name] = e.target.value
    setFormData(newForm);
  };

  const handleSubmit = ()=> {
    if(formData.title && formData.description){
      if(image){
        const postData = {...formData, date, 'img_link': image.base64};
        fetch('https://voluntree-network-101.herokuapp.com/singleTask?email=' + loggedInUser.email, {
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          },
          body:JSON.stringify(postData)
          })
          .then(res => res.json())
          .then(data => {
            if(data){
              alert('Event Added Successful');
              setRegisteredToggled(false);
              setFormData({});
              setImage('');
              window.location.reload();
              
            }});
      }
      else{
        alert('Please Select Volunteer Image');
      };

    }
    else{
      alert('Please Fill all Field');
    };
  };


const handleDelete = id => {
  const email = loggedInUser.email;
    fetch(`https://voluntree-network-101.herokuapp.com/delete/${id}`, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body:JSON.stringify({email})
    })
      .then(res => res.json())
      .then(data => {
          if (data) {
            alert('Volunteer SuccessFully Deleted');
            window.location.reload();
          }
      });
  }

    useEffect(() => {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      if(userInfo){
        fetch(`https://voluntree-network-101.herokuapp.com/register-user/admin?email=${userInfo.email}`,{
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          },
        })
        .then(res => res.json())
        .then(data =>{
          if(data){
            setRegisterList(data);
          }
        });
      }
    },[])

  return (
    <div>
      <div className="row">
        <div className="left_control">
            <Link to='/'><img className='tree_pic_logo' src={TreeLogo} alt=""/></Link>
            <p onClick={() => setRegisteredToggled(true)} className='volunteer_register_list'><img src={userLogo} alt=""/> Volunteer register list</p>
            <p onClick={() => setRegisteredToggled(false)} className='volunteer_register_list'><img src={plusLogo} alt=""/> Add event</p>
        </div>
          <div className="rightData_show">
            <h4>{registeredToggled ? "Volunteer register list" : "Add Event"}</h4>
            <div className='all_user_data_container'>
                <div className='table_container table-responsive'>
                { 
                    registeredToggled ?

                    <table className="table">
                        <thead className="table_header table-borderless">
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email ID</th>
                            <th scope="col">Registering Date</th>
                            <th scope="col">Volunteer Task</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                            registerList.length > 0 &&
                              registerList.map(register_user =>
                                <tr>
                                  <td>{register_user.registerData.name}</td>
                                  <td>{register_user.registerData.email}</td>
                                  <td>{(new Date(register_user.registerData.date).toDateString('dd/MM/yyyy'))}</td>
                                  <td>{register_user.registerData.taskTitle}</td>
                                  <td onClick={() => handleDelete(register_user._id)} className='delete_user_logo'><img src={deleteLogo} alt="delete"/></td>
                                </tr> 
                              )
                            }
                        </tbody>
                    </table>

                    :

                    <div className="row">
                      <div className='form_description_container'>
                        <form>
                          <label for='eventTitle'>Event Title</label>
                          <input onBlur={handleBlur} type="text" name='title' className="form-control" placeholder="Enter Title" id="eventTitle" required/>
                          <label for='description'>Description</label>
                          <textarea onBlur={handleBlur} name='description' placeholder="Description" className="form-control" id="description" rows="4" />
                        </form>
                      </div>
                      <div className='form_upload_container'>
                        <label for='eventDate'>Event Date</label>
                        <DatePicker date={date} className='date_picker' value={date} onDateChange={setDate} locale={enGB}>
                            {({ inputProps, focused }) => (
                                <input
                                className={'input' + (focused ? ' -focused' : '')}
                                {...inputProps}
                                />
                            )}
                          </DatePicker>
                        <label for='image'>Volunteer Image</label><br/>
                        <FileBase64 id='image' multiple={false} onDone={ base64 => setImage(base64 ) } />
                      </div>
                          <button onClick={handleSubmit} type='submit' className='submit_btn btn btn-primary'>Submit</button>
                    </div>
                }
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Admin;
