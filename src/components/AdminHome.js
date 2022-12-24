import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SetAppSideBar } from "../App";
import "../css/style.css";
import AppSidebar from "./AppSidebar";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigation = useNavigate()

  const location = useLocation();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (location.state && location.state.status === true) {
      setUserName(location.state.user_data.username);
    }
  });

  return (
    <>
      <div>{userName}</div>
    </>
  );
}

export default AdminHome;
