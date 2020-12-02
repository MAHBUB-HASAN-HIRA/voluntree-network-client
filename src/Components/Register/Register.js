import React, { useContext,  useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Register.css';
import TreeLogo from "../../volunteer-network-resources/logos/Group 1329.png";
import { useForm } from "react-hook-form";
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { UserContext } from '../../App';
import AllCardContainer from '../AllCardContainer/AllCardContainer';

const Register = () => {
    const [loggedInUser, , selectedTask] = useContext(UserContext);
    const [date, setDate] = useState(new Date());
    const { register, handleSubmit } = useForm();

    const history = useHistory()

    const onSubmit = data => {
        const volunteerData = {
            registerData:{...data, date,...selectedTask}
        }
        fetch('https://voluntree-network-101.herokuapp.com/register-user?email=' + loggedInUser.email, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
              },
            body:JSON.stringify(volunteerData)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                alert('Registration SuccessFully');
                sessionStorage.removeItem('task');
                history.replace('/mytasks');
            }
        });
    };  

    return (
        <>
            { 
                selectedTask._id ? 
                <div className='register_container'>
                    <div className='container col-sm-6 col-md-6 col-lg-6 '>          
                        <div className=' col-md-8 col-lg-5 logo_container'>
                            <Link to='/'><img className='tree_img_logo' src={TreeLogo} alt=""/></Link>
                        </div>
                        <div className='registerFormContainer'>
                            <h2>Register as a Volunteer</h2>
                            <form className='register_form' onSubmit={handleSubmit(onSubmit)}>
                                <input type='text' name="name" defaultValue={loggedInUser && loggedInUser.name} placeholder='Full Name'  ref={register({ required: true })} /><br/>
                                <input type='email' name="email" defaultValue={loggedInUser && loggedInUser.email}  placeholder='Username or Email' ref={register({ required: true })} /><br/>
                                <DatePicker date={date} value={date} onDateChange={setDate} locale={enGB}>
                                {({ inputProps, focused }) => (
                                    <input
                                    className={'input' + (focused ? ' -focused' : '')}
                                    {...inputProps}
                                    />
                                )}
                                </DatePicker>
                                <input type='text' name="description" placeholder='Description'  ref={register({ required: true })} /><br/>
                                <input type='text' name="taskTitle" defaultValue={selectedTask && selectedTask.title} placeholder='Task'  ref={register({ required: true })} /><br/>
                                <input value='Registration' className='submit_btn btn btn-primary' type="submit"/>
                            </form>
                        </div>
                    </div>
                </div>
                :
                <div className="container p_select">
                    <div className='logo_container'>
                        <Link to='/'><img className='tree_img_logo' src={TreeLogo} alt=""/></Link>
                    </div>
                    <h1>Please Select a Task</h1>
                    <AllCardContainer/>
                </div>
            }
        </>
    );
};

export default Register;