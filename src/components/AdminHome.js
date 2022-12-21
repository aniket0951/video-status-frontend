import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";

function AdminHome() {
    const location = useLocation();
    const [userName, setUserName] = useState("")
  useEffect(() => {
    if (location.state && location.state.status === true) {
      setUserName(location.state.user_data.username)
    }
  });

  return (
    <div>
      <h1>{userName}</h1>
    </div>
  );
}

export default AdminHome;
