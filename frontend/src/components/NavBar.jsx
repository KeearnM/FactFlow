/*=============================================================================
 | Purpose:  USE REACT-ROUTER-DOM COMPONENTS TO CREATE A CUSTOMIZABLE TOP
 |           NAVIGATION BAR THAT WILL ALSO INCLUDE THE APP LOGO AND LOGIN
 |           BUTTON.
 |           DOCUMENTATION: https://www.npmjs.com/package/react-router-dom
 |           ICONS FROM MATERIAL UI: https://mui.com/material-ui/material-icons/
 |
 | Input / Parameters:  NA.
 |   
 | Output / Returns:  NAVIGATES XXXXXX <<<< UPDATE LATER
 |
 *===========================================================================*/

import React, { useState } from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import UserContext from "../context/user";

// importing icons from MUI Icons
import LoginIcon from "@mui/icons-material/Login";
import Login from "./Login";

/*====================
CREATE NAVBAR & SET ITS NAVIGATION LOGIC
====================*/

const NavBar = () => {
  const [accessToken, setAccessToken] = useState("");
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink
              style={{ textDecoration: "none", borderBottom: "none" }}
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/main"
            >
              <img
                src="/src/assets/factFlow_logo.png"
                width="192"
                height="35"
                className="d-inline-block align-top"
                alt=""
              ></img>
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/main"
            >
              Main
            </NavLink>
          </li>
  */}
          <li style={{ marginLeft: "auto" }}>
            <button
              className={styles.loginButton}
              onClick={handleOpenLoginModal}
            >
              Login <LoginIcon />
            </button>
          </li>
        </ul>
      </nav>
      {/* Render the Login component conditionally */}
      <UserContext.Provider value={{ accessToken, setAccessToken }}>
        {openLoginModal && <Login handleClose={handleCloseLoginModal} />}
      </UserContext.Provider>
    </header>
  );
};

export default NavBar;
