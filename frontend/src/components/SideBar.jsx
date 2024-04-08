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

import React, { useState, useContext, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import styles from "./SideBar.module.css";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

// importing icons from MUI Icons
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import DirectionsRunOutlinedIcon from "@mui/icons-material/DirectionsRunOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const userCtx = useContext(UserContext);
  const [smartCollection, setSmartCollection] = useState([]);
  const fetchData = useFetch();

  // get smartCollection Object by user ID
  const getCollectionByUserID = async () => {
    const id = userCtx.loggedUserId;
    const res = await fetchData(
      "/api/" + id,
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setSmartCollection(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getCollectionByUserID();
    // console.log(userCtx.loggedUserId);
  }, [userCtx.loggedUserId]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Sidebar
      className={styles.sidebar}
      collapsed={collapsed}
      onToggle={toggleSidebar}
    >
      <Menu>
        <MenuItem
          icon={collapsed ? <MenuOutlinedIcon /> : <MenuOpenOutlinedIcon />}
          onClick={() => {
            toggleSidebar();
          }}
        ></MenuItem>
        {!collapsed && (
          <MenuItem>
            <p className={styles.sidebar}>Top Articles</p>
          </MenuItem>
        )}
        <SubMenu icon={<AttachMoneyOutlinedIcon />} label="Finance">
          {" "}
          <MenuItem>Test</MenuItem>
          <MenuItem>Test 2</MenuItem>
          <MenuItem>Test 3</MenuItem>
        </SubMenu>
        <MenuItem icon={<DirectionsRunOutlinedIcon />}> Sports</MenuItem>
        <MenuItem icon={<WorkOutlineOutlinedIcon />}> Business</MenuItem>
        <MenuItem icon={<AccountBalanceOutlinedIcon />}> Politics</MenuItem>
        <MenuItem icon={<MemoryOutlinedIcon />}> Tech</MenuItem>
        <MenuItem icon={<AttractionsOutlinedIcon />}> Entertainment</MenuItem>

        {/* render the additional side bar links if user is logged in */}
        {userCtx.accessToken ? (
          // ===WHAT WE WANT TO SHOW ON THE SIDEBAR AFTER LOGIN====

          <SubMenu icon={<CreateNewFolderIcon />} label="Feed">
            {smartCollection.map((item) => {
              return <MenuItem>{item.topic}</MenuItem>;
            })}
          </SubMenu>
        ) : (
          // ===END OF WHAT WE WANT TO SHOW ON THE SIDEBAR AFTER LOGIN====
          ""
        )}
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
