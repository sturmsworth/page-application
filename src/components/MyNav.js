import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

// bootstrap
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

// context
import { AuthContext } from "../context/AuthContext";

// routes
import {
  HOME,
  SIGN_IN,
  CREATE_ACCOUNT,
  MY_ACCOUNT,
  ABOUT_US,
  CONTACT_US,
  ADMIN_DASHBOARD,
} from "../routes";

// styles
import "../styles/MyNav.scss";

// images
import LOGO from "../images/senate-page-logo-column-rgb.png";

const NavigationBar = () => {
  //state
  const [icon, setIcon] = useState(true);

  // context
  const { currentUser, currentAdmin, signOut, currentSenator } =
    useContext(AuthContext);

  const changeIcon = () => {
    setIcon(!icon);
  };

  return (
    <div>
      <Navbar fixed="top" collapseOnSelect expand="lg">
        <Navbar.Brand>
          <Link to={HOME}>
            <img src={LOGO} className="senate-logo" alt="senate-logo" />
            Senate Page Program
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="custom-toggler"
          onClick={changeIcon}
        >
          <span className="custom-toggler">
            {icon ? (
              <i className="fas fa-user-circle fa-lg"></i>
            ) : (
              <i className="fas fa-times"></i>
            )}
          </span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Link to={ABOUT_US} className="nav-link">
              About Us
            </Link>

            <Link to={CONTACT_US} className="nav-link">
              Contact Us
            </Link>

            <NavDropdown
              title={
                currentUser
                  ? `${currentUser.displayName}`
                  : currentAdmin !== null
                  ? `${currentAdmin.displayName}`
                  : currentSenator
                  ? `${currentSenator.displayName}`
                  : `Get Started`
              }
              className="custom-nav-dropdown mr-5"
            >
              {currentUser ? (
                <div>
                  <Link to={MY_ACCOUNT} className="dropdown-item">
                    My Account
                  </Link>

                  <Link to={HOME} onClick={signOut} className="dropdown-item">
                    Sign Out
                  </Link>
                </div>
              ) : currentAdmin || currentSenator ? (
                <div>
                  <Link to={ADMIN_DASHBOARD} className="dropdown-item">
                    My Dashboard
                  </Link>

                  <Link to={HOME} onClick={signOut} className="dropdown-item">
                    Sign Out
                  </Link>
                </div>
              ) : (
                <div>
                  <Link to={SIGN_IN} className="dropdown-item">
                    Sign In
                  </Link>

                  <Link to={CREATE_ACCOUNT} className="dropdown-item">
                    Create Account
                  </Link>
                </div>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="nav-bg-highlight" />
    </div>
  );
};

export default NavigationBar;
