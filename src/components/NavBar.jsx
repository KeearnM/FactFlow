import React from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

/*====================
CREATE NAVBAR & SET ITS NAVIGATION LOGIC
====================*/

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <img
              src="/src/assets/factFlow_logo.png"
              width="192"
              height="35"
              className="d-inline-block align-top"
              alt=""
            ></img>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/main"
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/main"
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/main"
            >
              Main
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
