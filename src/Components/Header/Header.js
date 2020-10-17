import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Header.css";
import logo from "../../volunteer-network-resources/logos/Group 1329.png";
import { UserContext } from "../../App";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    setCurrentLocation(window.location.pathname);
  }, [useParams()]);

const handleSignOut = () => {
  localStorage.removeItem(`userInfo`);
  setLoggedInUser({
    isSignIn:false,
    name:'',
    email:'',
    password:'',
    photoURL:'',
    error:'',
    success: false,
  })
}

  let customClassName = "navForOther";
  if (currentLocation === "/" || currentLocation === "/mytasks") {
    customClassName = "navForHome container";
  }

  return (
    <div className='nav_div'>
      <div className={customClassName}>
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
              <li className="nav-item">
                {loggedInUser.isSignIn && (
                  <span className="nav_link name">
                    <strong>{loggedInUser.name}</strong>
                  </span>
                )}
              </li>
              <li className="nav-item">
                {loggedInUser.isSignIn && (
                  <button onClick={handleSignOut} className="btn btn-danger">
                    SignOut
                  </button>
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
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
