import React from "react";
import "./Admin.css";
import TreeLogo from "../../volunteer-network-resources/logos/Group 1329.png";
import deleteLogo from "../../volunteer-network-resources/logos/trash-2 9.png";
import { Link } from "react-router-dom";
import userLogo from "../../volunteer-network-resources/logos/users-alt 1.png"
import plusLogo from "../../volunteer-network-resources/logos/plus 1.png"

const Admin = () => {

  return (
    <div>
      <div class="row">
        <div class="left_control">
            <Link to='/'><img className='tree_pic_logo' src={TreeLogo} alt=""/></Link>
            <p className='volunteer_register_list'><img src={userLogo} alt=""/> Volunteer register list</p>
            <p className='volunteer_register_list'><img src={plusLogo} alt=""/> Add event</p>
        </div>
        <div class="rightData_show">
            <h4>Volunteer register list</h4>
            <div className='all_user_data_container'>
                <div className='table_container'>
                    <table className="table">
                        <thead className="table_header table-borderless">
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email ID</th>
                            <th scope="col">Registrating Date</th>
                            <th scope="col">Volunteer Task</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mark</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td className='delete_user_ogo'><img src={deleteLogo} alt="delete"/></td>
                            </tr> 
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
