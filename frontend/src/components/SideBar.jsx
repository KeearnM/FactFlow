/*=============================================================================
 | Purpose:  USE REACT-PRO-SIDEBAR COMPONENTS TO CREATE A HIGH LEVEL AND
 |           CUSTOMIZABLE SIDE NAVIGATION
 |           DOCUMENTATION: https://www.npmjs.com/package/react-pro-sidebar
 |           ICONS FROM MATERIAL UI: https://mui.com/material-ui/material-icons/
 |
 | Input / Parameters:  NA.
 |   
 | Output / Returns:  NAVIGATES XXXXXX <<<< UPDATE LATER
 |
 *===========================================================================*/

import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import styles from "./SideBar.module.css";

// importing icons from MUI Icons
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import DirectionsRunOutlinedIcon from "@mui/icons-material/DirectionsRunOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";

const SideBar = () => {
  return (
    <Sidebar className={styles.sidebar}>
      <Menu>
        <div className={styles.sidebar}>
          <p>Top Articles</p>
        </div>
        <SubMenu prefix={<AttachMoneyOutlinedIcon />} label="Finance">
          {" "}
          <MenuItem>Test</MenuItem>
          <MenuItem>Test 2</MenuItem>
          <MenuItem>Test 3</MenuItem>
        </SubMenu>
        <MenuItem prefix={<DirectionsRunOutlinedIcon />}> Sports</MenuItem>
        <MenuItem prefix={<WorkOutlineOutlinedIcon />}> Business</MenuItem>
        <MenuItem prefix={<AccountBalanceOutlinedIcon />}> Politics</MenuItem>
        <MenuItem prefix={<MemoryOutlinedIcon />}> Tech</MenuItem>
        <MenuItem prefix={<AttractionsOutlinedIcon />}> Entertainment</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
