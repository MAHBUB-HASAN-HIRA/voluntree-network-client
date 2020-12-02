import React, { useContext} from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../volunteer-network-resources/logos/Group 1329.png";
import { UserContext } from "../../App";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

const handleSignOut = () => {
  setLoggedInUser({});
  sessionStorage.removeItem(`userInfo`);
  sessionStorage.removeItem(`token`);
}

  return (
    <div className='nav_div'>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link to="/">
            <img className="img_logo" src={logo} alt="volunteer network" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ml-auto d-flex align-items-center">
              <li className="nav-item ">
                <Link className="nav_link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav_link" to="#">
                  Donation
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav_link" to="#">
                  Event
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav_link" to="#">
                  Blog
                </Link>
              </li>
              {loggedInUser.isSignIn && 
                <li className="nav-item">
                  <Link className="nav_link" to="/mytasks">
                    My Task
                  </Link>
                </li>
              }
              <li className="nav-item">
                {loggedInUser.isSignIn && (
                  <span className="nav_link name">
                    <strong>{loggedInUser.name}</strong>
                  </span>
                )}
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-dark" to="/admin">
                  Admin
                </Link>
              </li>
              <li className="nav-item">
                {loggedInUser.isSignIn && (
                  <button onClick={handleSignOut} className="btn btn-danger">
                    SignOut
                  </button>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
